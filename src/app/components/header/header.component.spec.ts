import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterModule]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render menu items', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('.link'));
    expect(menuItems.length).toBe(component.menuItems.length);

    component.menuItems.forEach((menuItem, index) => {
      const linkElement = menuItems[index].nativeElement as HTMLElement;
      expect(linkElement.textContent).toContain(menuItem);
      expect(linkElement.getAttribute('title')).toBe(menuItem);
      expect(linkElement.getAttribute('routerLink')).toBe(`/${menuItem}`);
    });
  });
});
