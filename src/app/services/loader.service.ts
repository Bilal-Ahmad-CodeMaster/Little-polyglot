import { Injectable, NgZone } from '@angular/core';

const SHOW_DELAY_MS = 250;

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading = false;

  private pendingCount = 0;
  private showTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private zone: NgZone) {}

  show(): void {
    this.pendingCount++;

    if (this.pendingCount === 1 && !this.showTimer) {
      // Debounce so quick requests never flash the loader — only genuinely
      // slow requests (network/translation) trigger a visible loading state.
      this.showTimer = setTimeout(() => {
        this.zone.run(() => {
          if (this.pendingCount > 0) {
            this.isLoading = true;
          }
        });
      }, SHOW_DELAY_MS);
    }
  }

  hide(): void {
    this.pendingCount = Math.max(0, this.pendingCount - 1);

    if (this.pendingCount === 0) {
      if (this.showTimer) {
        clearTimeout(this.showTimer);
        this.showTimer = null;
      }
      this.isLoading = false;
    }
  }
}
