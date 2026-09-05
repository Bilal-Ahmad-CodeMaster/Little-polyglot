import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-video-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-hero.component.html',
  styleUrl: './video-hero.component.css',
})
export class VideoHeroComponent implements AfterViewInit, OnDestroy {
  readonly videos = [
    '/public/assets/videos/1.mp4',
    '/public/assets/videos/2.mp4',
    '/public/assets/videos/3.mp4',
    '/public/assets/videos/4.mp4',
    '/public/assets/videos/5.mp4',
  ];

  activeIndex = 0;

  @ViewChildren('heroVideo') videoRefs!: QueryList<ElementRef<HTMLVideoElement>>;

  private readonly loadedIndices = new Set<number>();
  private readonly isBrowser: boolean;
  private slideTimer?: ReturnType<typeof setInterval>;

  /** Fade to the next clip every 5 seconds */
  private readonly slideIntervalMs = 5000;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.markLoaded(this.activeIndex);
    this.markLoaded(this.nextIndex(this.activeIndex));

    this.videoRefs.changes.subscribe(() => void this.syncPlayback());

    queueMicrotask(() => void this.syncPlayback());

    this.slideTimer = setInterval(() => {
      this.goTo(this.nextIndex(this.activeIndex));
    }, this.slideIntervalMs);
  }

  ngOnDestroy(): void {
    if (this.slideTimer) clearInterval(this.slideTimer);
  }

  shouldLoad(index: number): boolean {
    return this.loadedIndices.has(index);
  }

  isActive(index: number): boolean {
    return index === this.activeIndex;
  }

  goTo(index: number): void {
    if (index === this.activeIndex || index < 0 || index >= this.videos.length) return;

    this.activeIndex = index;
    this.markLoaded(index);
    this.markLoaded(this.nextIndex(index));

    queueMicrotask(() => void this.syncPlayback());
  }

  onCanPlay(index: number): void {
    if (index === this.activeIndex) {
      void this.playActiveVideo();
    }
  }

  private markLoaded(index: number): void {
    this.loadedIndices.add(index);
  }

  private nextIndex(current: number): number {
    return (current + 1) % this.videos.length;
  }

  private getActiveVideo(): HTMLVideoElement | undefined {
    return this.videoRefs?.get(this.activeIndex)?.nativeElement;
  }

  private async playActiveVideo(): Promise<void> {
    const active = this.getActiveVideo();
    if (!active) return;

    active.muted = true;
    try {
      await active.play();
    } catch {
      // Autoplay blocked — will retry on next canplay.
    }
  }

  private async syncPlayback(): Promise<void> {
    if (!this.isBrowser || !this.videoRefs) return;

    this.videoRefs.forEach(({ nativeElement }, index) => {
      nativeElement.muted = true;
      nativeElement.controls = false;
      nativeElement.loop = index === this.activeIndex;
      if (index !== this.activeIndex) {
        nativeElement.pause();
      }
    });

    const active = this.getActiveVideo();
    if (!active) return;

    active.currentTime = 0;
    await this.playActiveVideo();
  }
}
