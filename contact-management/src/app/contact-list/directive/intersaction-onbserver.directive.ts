import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appIntersactionOnbserver]',
  standalone: true
})
export class IntersactionOnbserverDirective {
  @Input() itemHeight: number = 50;
  @Input() totalItems: number = 0;
  @Input() loadedItems: number = 0;
  @Output() loadMore = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    const scrollPosition = element.scrollTop + element.clientHeight;
    const scrollThreshold = element.scrollHeight - (this.itemHeight * 2);

    if (scrollPosition > scrollThreshold && this.loadedItems < this.totalItems) {
      this.loadMore.emit();
    }
  }
}
