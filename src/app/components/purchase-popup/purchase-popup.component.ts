import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { THANKS_TEXT } from '@shared/constants';

@Component({
  selector: 'app-purchase-popup',
  templateUrl: './purchase-popup.component.html',
  styleUrls: ['../../../styles/cart.scss']
})
export class PurchasePopupComponent {
  @Output() closePopup = new EventEmitter<void>();

  public text: string = THANKS_TEXT;
  constructor() {}

  @HostListener('keydown.escape', ['$event'])
  handleKeyPress(): void {
    this.closePopup.emit();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
