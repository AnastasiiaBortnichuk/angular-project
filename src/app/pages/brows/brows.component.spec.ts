import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsComponent } from './brows.component';

describe('BrowsComponent', () => {
  let component: BrowsComponent;
  let fixture: ComponentFixture<BrowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowsComponent]
    });
    fixture = TestBed.createComponent(BrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
