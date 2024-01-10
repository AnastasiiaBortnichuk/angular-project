import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceComponent } from './face.component';

describe('FaceComponent', () => {
  let component: FaceComponent;
  let fixture: ComponentFixture<FaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaceComponent]
    });
    fixture = TestBed.createComponent(FaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
