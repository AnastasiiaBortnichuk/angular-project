import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { productReducer } from '../state/reducers/products.reducers';
import { userReducer } from '../state/reducers/users.reducers';
import { ProductEffects } from '../state/effects/products.effects';
import { UserEffects } from '../state/effects/users.effects';

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
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductsTableComponent } from './pages/products-table/products-table.component';
import { UsersTableComponent } from './pages/users-table/users-table.component';
import { AddressFormatterPipe } from './address-formatter.pipe';


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
    ButtonsComponent,
    CustomTableComponent,
    ProductsTableComponent,
    UsersTableComponent,
    AddressFormatterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    InfiniteScrollModule,
    StoreModule.forRoot({
      products: productReducer,
      users: userReducer
    }),
    EffectsModule.forRoot([ProductEffects, UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [CartService, FavoritesService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
