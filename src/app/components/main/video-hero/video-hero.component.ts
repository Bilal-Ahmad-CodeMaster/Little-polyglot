import { CommonModule, isPlatformBrowser } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
} from "@angular/core";

@Component({
  selector: "app-video-hero",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./video-hero.component.html",
  styleUrl: "./video-hero.component.css",
})
export class VideoHeroComponent implements AfterViewInit, OnDestroy {
  readonly videos = [
    "/public/assets/videos/1.mp4",
    "/public/assets/videos/2.mp4",
    "/public/assets/videos/3.mp4",
    "/public/assets/videos/4.mp4",
    "/public/assets/videos/5.mp4",
  ];

  activeIndex = 0;
  isMuted = true;

  @ViewChildren("heroVideo") videoRefs!: QueryList<ElementRef<HTMLVideoElement>>;

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

  ngOnDestroy(): void {
    this.videoRefs?.forEach((videoRef: ElementRef<HTMLVideoElement>) => {
      this.silenceVideo(videoRef.nativeElement);
    });
  }

  shouldLoad(index: number): boolean {
    return this.loadedIndices.has(index);
  }

  isActive(index: number): boolean {
    return index === this.activeIndex;
  }

  onCanPlay(index: number): void {
    if (index === this.activeIndex) {
      void this.playActiveVideo();
      return;
    }

    this.silenceVideo(this.videoRefs?.get(index)?.nativeElement);
  }

  onPlaying(index: number): void {
    if (index === this.activeIndex) return;
    this.silenceVideo(this.videoRefs?.get(index)?.nativeElement);
  }

  onVideoEnded(index: number): void {
    if (index !== this.activeIndex) return;

    this.activeIndex = this.nextIndex(this.activeIndex);
    this.markLoaded(this.activeIndex);
    this.markLoaded(this.nextIndex(this.activeIndex));
    void this.syncPlayback();
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    this.applyAudioState();
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

  private silenceVideo(video?: HTMLVideoElement): void {
    if (!video) return;

    video.pause();
    video.muted = true;
    video.volume = 0;
  }

  private applyAudioState(): void {
    this.videoRefs?.forEach((videoRef: ElementRef<HTMLVideoElement>, index: number) => {
      const video = videoRef.nativeElement;
      const isActive = index === this.activeIndex;

      video.muted = !isActive || this.isMuted;
      video.volume = isActive && !this.isMuted ? 1 : 0;
    });
  }

  private async playActiveVideo(): Promise<void> {
    const active = this.getActiveVideo();
    if (!active) return;

    this.applyAudioState();
    try {
      await active.play();
    } catch {
      // Muted autoplay can still be deferred by some browsers.
    }
  }

  private async syncPlayback(): Promise<void> {
    if (!this.isBrowser || !this.videoRefs) return;

    this.videoRefs.forEach((videoRef: ElementRef<HTMLVideoElement>, index: number) => {
      const video = videoRef.nativeElement;
      video.controls = false;
      video.loop = false;
      video.autoplay = false;

      if (index !== this.activeIndex) {
        this.silenceVideo(video);
      }
    });

    const active = this.getActiveVideo();
    if (!active) return;

    active.currentTime = 0;
    await this.playActiveVideo();
  }
}
