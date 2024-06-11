import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { By } from '@angular/platform-browser';
import { ButtonsComponent } from '@app-components/buttons/buttons.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent, ButtonsComponent]
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product details', () => {
    const product = {
      id: 1,
      api_featured_image: 'image-url',
      brand: 'Brand',
      name: 'Product Name',
      price: '10.00',
      product_colors: [{ hex_value: '#FF0000', colour_name: 'red' }],
      product_type: 'mascara'
    };
    component.product = product;
    fixture.detectChanges();

    const productContainer = fixture.debugElement.query(By.css('.products__container'));
    expect(productContainer).toBeTruthy();

    const productImage = fixture.debugElement.query(By.css('.image'));
    expect(productImage.nativeElement.src).toContain(product.api_featured_image);

    const brandName = fixture.debugElement.query(By.css('.brand_name')).nativeElement;
    expect(brandName.textContent).toContain(product.brand);

    const productName = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(productName.textContent).toContain(product.name);

    const productPrice = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(productPrice.textContent).toContain(product.price);

    const colorCircle = fixture.debugElement.query(By.css('.color_circle'));
    expect(colorCircle.nativeElement.style.background).toContain(product.product_colors[0].hex_value);
  });
});
