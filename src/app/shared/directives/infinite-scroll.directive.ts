import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[infiniteScroll]',
})
export class InfiniteScrollDirective {
  @Output() scrolledToBottom = new EventEmitter<void>();

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const { scrollHeight, offsetHeight } = document.documentElement;

    const scrollPosition = this.getScrollPosition();
    const windowHeight = offsetHeight;
    const documentHeight = scrollHeight;
    const scrolledToBottom = this.isScrolledToBottom(scrollPosition, windowHeight, documentHeight);

    if (scrolledToBottom) this.scrolledToBottom.emit();
  }

  private getScrollPosition(): number {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

  private isScrolledToBottom(scrollPosition: number, windowHeight: number, documentHeight: number): boolean {
    const distanceFromBottom = Math.round(scrollPosition + windowHeight);
    return distanceFromBottom >= documentHeight;
  }
}
