import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyesComponent } from './eyes.component';

describe('EyesComponent', () => {
  let component: EyesComponent;
  let fixture: ComponentFixture<EyesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EyesComponent]
    });
    fixture = TestBed.createComponent(EyesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
