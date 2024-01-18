import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from '@app-components/header/header.component';
import { HomeComponent } from '@app-pages/home/home.component';
import { ProductsSectionComponent } from '@app-components/products-section/products-section.component';
import { EyesComponent } from '@app-pages/eyes/eyes.component';
import { ProductsComponent } from '@app-components/products/products.component';
import { ProductComponent } from '@app-components/product/product.component';
import { CartService } from '@app-services/cart.service';
import { FavoritesService } from '@app-services/favorites.service';
import { FaceComponent } from '@app-pages/face/face.component';
import { LipsComponent } from '@app-pages/lips/lips.component';
import { BrowsComponent } from '@app-pages/brows/brows.component';
import { NailsComponent } from '@app-pages/nails/nails.component';
import { ProductDetailsComponent } from '@app-pages/product-details/product-details.component';
import { CartComponent } from '@app-pages/cart/cart.component';
import { FavoritesComponent } from '@app-pages/favorites/favorites.component';
import { PurchasePopupComponent } from '@app-components/purchase-popup/purchase-popup.component';
import { FiltersComponent } from '@app-components/filters/filters.component';
import { CatalogComponent } from '@app-pages/catalog/catalog.component';
import { CategoryComponent } from './pages/category/category.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ProductsService } from '@app-services/products.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsSectionComponent,
    EyesComponent,
    ProductsComponent,
    ProductComponent,
    FaceComponent,
    LipsComponent,
    BrowsComponent,
    NailsComponent,
    ProductDetailsComponent,
    CartComponent,
    FavoritesComponent,
    PurchasePopupComponent,
    FiltersComponent,
    CatalogComponent,
    CategoryComponent,
    ButtonsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'eyes', component: EyesComponent},
      { path: 'face', component: FaceComponent },
      { path: 'lips', component: LipsComponent },
      { path: 'brows', component: BrowsComponent },
      { path: 'nails', component: NailsComponent },
      { path: 'product/:productId', component: ProductDetailsComponent },
      { path: 'category/:productType', component: CategoryComponent },
      { path: 'cart', component: CartComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'catalog', component: CatalogComponent },
    ])
  ],
  providers: [CartService, FavoritesService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
