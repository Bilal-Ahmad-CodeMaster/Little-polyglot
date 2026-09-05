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

@Component({
  selector: 'app-video-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-hero.component.html',
  styleUrl: './video-hero.component.css',
})
export class VideoHeroComponent implements AfterViewInit {
  readonly videos = [
    '/public/assets/videos/1.mp4',
    '/public/assets/videos/2.mp4',
    '/public/assets/videos/3.mp4',
    '/public/assets/videos/4.mp4',
    '/public/assets/videos/5.mp4',
  ];

  activeIndex = 0;
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

    this.videoRefs.changes.subscribe(() => void this.syncPlayback());

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

  onVideoEnded(index: number): void {
    if (index !== this.activeIndex) return;
    this.goTo(this.nextIndex(this.activeIndex));
  }

  onCanPlay(index: number): void {
    if (index === this.activeIndex) {
      void this.playActiveVideo();
    }
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    this.videoRefs?.forEach(({ nativeElement }) => {
      nativeElement.muted = this.isMuted;
    });
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

    active.muted = this.isMuted;
    try {
      await active.play();
    } catch {
      // Autoplay blocked until user interacts — muted retry on next canplay.
    }
  }

  private async syncPlayback(): Promise<void> {
    if (!this.isBrowser || !this.videoRefs) return;

    this.videoRefs.forEach(({ nativeElement }, index) => {
      nativeElement.muted = this.isMuted;
      nativeElement.controls = false;
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
