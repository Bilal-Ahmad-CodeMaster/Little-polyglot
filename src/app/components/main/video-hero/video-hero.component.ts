import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
} from '@angular/core';

export interface HeroVideo {
  src: string;
  label: string;
}

@Component({
  selector: 'app-video-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-hero.component.html',
  styleUrl: './video-hero.component.css',
})
export class VideoHeroComponent implements AfterViewInit {
  readonly videos: HeroVideo[] = [
    { src: '/public/assets/videos/1.mp4', label: 'Zajęcia językowe 1' },
    { src: '/public/assets/videos/2.mp4', label: 'Zajęcia językowe 2' },
    { src: '/public/assets/videos/3.mp4', label: 'Zajęcia językowe 3' },
    { src: '/public/assets/videos/4.mp4', label: 'Zajęcia językowe 4' },
    { src: '/public/assets/videos/5.mp4', label: 'Zajęcia językowe 5' },
  ];

  activeIndex = 0;
  isPlaying = true;
  isMuted = true;

  @ViewChildren('heroVideo') videoRefs!: QueryList<ElementRef<HTMLVideoElement>>;

  private readonly loadedIndices = new Set<number>();
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.markLoaded(this.activeIndex);
    this.markLoaded(this.nextIndex(this.activeIndex));

    this.videoRefs.changes.subscribe(() => {
      void this.syncPlayback();
    });

    queueMicrotask(() => void this.syncPlayback());
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

  previous(): void {
    this.goTo((this.activeIndex - 1 + this.videos.length) % this.videos.length);
  }

  next(): void {
    this.goTo(this.nextIndex(this.activeIndex));
  }

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
    void this.syncPlayback();
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    this.applyMuteState();
  }

  onVideoEnded(index: number): void {
    if (index !== this.activeIndex) return;
    this.next();
  }

  onLoadedMetadata(index: number): void {
    if (index === this.activeIndex) {
      void this.syncPlayback();
    }
  }

  onCanPlay(index: number): void {
    if (index === this.activeIndex && this.isPlaying) {
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

  private applyMuteState(): void {
    this.videoRefs?.forEach(({ nativeElement }) => {
      nativeElement.muted = this.isMuted;
    });
  }

  private async playActiveVideo(): Promise<void> {
    const active = this.getActiveVideo();
    if (!active || !this.isPlaying) return;

    active.muted = this.isMuted;
    try {
      await active.play();
    } catch {
      // Browser may block until user gesture; retry on next interaction.
      this.isPlaying = true;
    }
  }

  private async syncPlayback(): Promise<void> {
    if (!this.isBrowser || !this.videoRefs) return;

    this.videoRefs.forEach(({ nativeElement }, index) => {
      if (index !== this.activeIndex) {
        nativeElement.pause();
      }
      nativeElement.muted = this.isMuted;
    });

    const active = this.getActiveVideo();
    if (!active) return;

    if (this.isPlaying) {
      await this.playActiveVideo();
    } else {
      active.pause();
    }
  }
}
