import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { API_CONFIG } from '../../config';
import { LANGUAGE_CODE_MAP, LanguageService } from './language.service';

const SOURCE_LANGUAGE = 'pl';
const TRANSLATE_KEYS = new Set([
  'title',
  'subTitle',
  'subtitle',
  'subTittle',
  'description',
  'subDescription',
  'extraDescription',
  'annotation',
  'label',
  'imageGalleryAboutUsDescription',
  'extraInfoModal',
  'titleToShowBranchFor',
  'branchName',
  'name',
  'Address',
  'streetAddress',
  'schoolName',
  'content',
  'text',
  'message',
  'excerpt',
  'location',
]);

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'CODE', 'PRE']);
const PERSISTENT_CACHE_KEY = 'translationCache.v1';
const MAX_PERSISTENT_ENTRIES = 2000;
const GOOGLE_CONCURRENCY = 10;

@Injectable({
  providedIn: 'root',
})
export class PageTranslatorService {
  private readonly memoryCache = this.loadPersistentCache();
  private readonly translatedOutputs = new Set<string>();
  private readonly translatedNodes = new WeakSet<Text>();
  private started = false;
  private domTimer: ReturnType<typeof setTimeout> | null = null;
  private translatingDom = false;
  private persistTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}

  get targetLang(): string {
    return LANGUAGE_CODE_MAP[this.languageService.currentLanguage.language] || SOURCE_LANGUAGE;
  }

  get shouldTranslate(): boolean {
    return this.targetLang !== SOURCE_LANGUAGE;
  }

  start(): void {
    if (this.started) {
      return;
    }
    this.started = true;

    document.documentElement.lang = this.targetLang;
    document.documentElement.dir = ['ur', 'ar', 'he'].includes(this.targetLang)
      ? 'rtl'
      : 'ltr';

    if (!this.shouldTranslate) {
      return;
    }

    this.scheduleDomTranslate(400);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.urlAfterRedirects.includes('adminPanel')) {
          return;
        }
        this.scheduleDomTranslate(400);
      });
  }

  isAdminRoute(): boolean {
    return this.router.url.includes('adminPanel');
  }

  isTranslatableApiUrl(url: string): boolean {
    return url.includes('/school-branches') || url.includes('/blog');
  }

  scheduleDomTranslate(delay = 300): void {
    if (!this.shouldTranslate || this.isAdminRoute()) {
      return;
    }
    if (this.domTimer) {
      clearTimeout(this.domTimer);
    }
    this.domTimer = setTimeout(() => {
      void this.translateDom();
    }, delay);
  }

  async translateJson<T>(payload: T): Promise<T> {
    if (!this.shouldTranslate || payload == null) {
      return payload;
    }

    const texts: string[] = [];
    this.collectJsonStrings(payload, undefined, texts);
    const unique = [...new Set(texts)];
    if (!unique.length) {
      return payload;
    }

    const translated = await this.translateTexts(unique);
    const mapped = new Map(unique.map((text, index) => [text, translated[index] ?? text]));
    return this.applyJsonStrings(payload, undefined, mapped);
  }

  private collectJsonStrings(value: unknown, key: string | undefined, bag: string[]): void {
    if (typeof value === 'string') {
      if (key && TRANSLATE_KEYS.has(key) && this.isTranslatableText(value)) {
        bag.push(value);
      }
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => this.collectJsonStrings(item, key, bag));
      return;
    }

    if (value && typeof value === 'object') {
      Object.entries(value as Record<string, unknown>).forEach(([childKey, childValue]) => {
        this.collectJsonStrings(childValue, childKey, bag);
      });
    }
  }

  private applyJsonStrings<T>(value: T, key: string | undefined, mapped: Map<string, string>): T {
    if (typeof value === 'string') {
      if (key && TRANSLATE_KEYS.has(key)) {
        return (mapped.get(value) ?? value) as T;
      }
      return value;
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.applyJsonStrings(item, key, mapped)) as T;
    }

    if (value && typeof value === 'object') {
      const result: Record<string, unknown> = {};
      Object.entries(value as Record<string, unknown>).forEach(([childKey, childValue]) => {
        result[childKey] = this.applyJsonStrings(childValue, childKey, mapped);
      });
      return result as T;
    }

    return value;
  }

  private async translateDom(): Promise<void> {
    if (this.translatingDom || !this.shouldTranslate || this.isAdminRoute()) {
      return;
    }

    const root = document.querySelector('app-root');
    if (!root) {
      return;
    }

    const nodes: Text[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let current = walker.nextNode();
    while (current) {
      const textNode = current as Text;
      if (this.shouldTranslateNode(textNode) && !this.translatedNodes.has(textNode)) {
        nodes.push(textNode);
      }
      current = walker.nextNode();
    }

    const unique = [...new Set(nodes.map((node) => node.textContent || ''))];
    if (!unique.length) {
      return;
    }

    this.translatingDom = true;
    try {
      const translated = await this.translateTexts(unique);
      const mapped = new Map(unique.map((text, index) => [text, translated[index] ?? text]));
      nodes.forEach((node) => {
        const original = node.textContent || '';
        const next = mapped.get(original);
        if (next && next !== original) {
          node.textContent = next;
        }
        this.translatedNodes.add(node);
      });
    } finally {
      this.translatingDom = false;
    }
  }

  private shouldTranslateNode(node: Text): boolean {
    const text = node.textContent || '';
    if (!this.isTranslatableText(text)) {
      return false;
    }

    let element = node.parentElement;
    while (element) {
      if (
        SKIP_TAGS.has(element.tagName) ||
        element.classList.contains('notranslate') ||
        element.getAttribute('translate') === 'no'
      ) {
        return false;
      }
      element = element.parentElement;
    }

    return true;
  }

  private isTranslatableText(text: string): boolean {
    const trimmed = text.trim();
    if (trimmed.length < 2) {
      return false;
    }
    if (this.translatedOutputs.has(text) || this.translatedOutputs.has(trimmed)) {
      return false;
    }
    if (/^https?:\/\//i.test(trimmed) || trimmed.includes('@')) {
      return false;
    }
    return /[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]/.test(trimmed);
  }

  private async translateTexts(texts: string[]): Promise<string[]> {
    const results = new Array<string>(texts.length);
    const pendingIndexes: number[] = [];

    texts.forEach((text, index) => {
      const cached = this.memoryCache.get(this.cacheKey(text));
      if (cached) {
        results[index] = cached;
      } else {
        pendingIndexes.push(index);
      }
    });

    const pendingTexts = pendingIndexes.map((index) => texts[index]);
    if (!pendingTexts.length) {
      return results;
    }

    const chunks = this.chunk(pendingTexts, 25);
    const translatedChunks: string[] = [];
    for (const chunk of chunks) {
      const translated = await this.translateChunk(chunk);
      translatedChunks.push(...translated);
    }

    pendingIndexes.forEach((originalIndex, pendingIndex) => {
      const translated = translatedChunks[pendingIndex] ?? texts[originalIndex];
      results[originalIndex] = translated;
      this.memoryCache.set(this.cacheKey(texts[originalIndex]), translated);
      this.translatedOutputs.add(translated);
    });

    this.schedulePersistCache();
    return results;
  }

  private async translateChunk(texts: string[]): Promise<string[]> {
    try {
      return await this.translateViaGoogle(texts);
    } catch {
      return this.translateViaBackend(texts);
    }
  }

  private async translateViaGoogle(texts: string[]): Promise<string[]> {
    const results: string[] = [];
    const groups = this.chunk(texts, GOOGLE_CONCURRENCY);
    for (const group of groups) {
      const part = await Promise.all(group.map((text) => this.translateOneWithGoogle(text)));
      results.push(...part);
    }
    return results;
  }

  private async translateOneWithGoogle(text: string): Promise<string> {
    const url =
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${SOURCE_LANGUAGE}` +
      `&tl=${encodeURIComponent(this.targetLang)}&dt=t&q=${encodeURIComponent(text.slice(0, 4500))}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google translate failed: ${response.status}`);
    }
    const data = await response.json();
    return (data?.[0] || []).map((row: string[]) => row?.[0] || '').join('') || text;
  }

  private async translateViaBackend(texts: string[]): Promise<string[]> {
    const response = await fetch(API_CONFIG['translate'], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        texts,
        source: SOURCE_LANGUAGE,
        target: this.targetLang,
      }),
    });

    if (!response.ok) {
      return texts;
    }

    const body = await response.json();
    return Array.isArray(body?.data) ? body.data : texts;
  }

  private cacheKey(text: string): string {
    return `${this.targetLang}:${text}`;
  }

  private chunk<T>(items: T[], size: number): T[][] {
    const groups: T[][] = [];
    for (let i = 0; i < items.length; i += size) {
      groups.push(items.slice(i, i + size));
    }
    return groups;
  }

  private loadPersistentCache(): Map<string, string> {
    try {
      const raw = localStorage.getItem(PERSISTENT_CACHE_KEY);
      if (!raw) {
        return new Map();
      }
      const entries = JSON.parse(raw) as [string, string][];
      return new Map(entries);
    } catch {
      return new Map();
    }
  }

  private schedulePersistCache(): void {
    if (this.persistTimer) {
      clearTimeout(this.persistTimer);
    }
    this.persistTimer = setTimeout(() => this.persistCache(), 500);
  }

  private persistCache(): void {
    try {
      let entries = [...this.memoryCache.entries()];
      if (entries.length > MAX_PERSISTENT_ENTRIES) {
        entries = entries.slice(entries.length - MAX_PERSISTENT_ENTRIES);
      }
      localStorage.setItem(PERSISTENT_CACHE_KEY, JSON.stringify(entries));
    } catch {
      // Storage full or unavailable — translations still work via memory cache.
    }
  }
}
