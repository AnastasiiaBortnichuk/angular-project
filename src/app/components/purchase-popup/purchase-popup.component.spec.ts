import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePopupComponent } from './purchase-popup.component';

describe('PurchasePopupComponent', () => {
  let component: PurchasePopupComponent;
  let fixture: ComponentFixture<PurchasePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasePopupComponent]
    });
    fixture = TestBed.createComponent(PurchasePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
