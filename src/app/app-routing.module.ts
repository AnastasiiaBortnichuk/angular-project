import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { BrowsComponent } from "@app-pages/brows/brows.component";
import { CartComponent } from "@app-pages/cart/cart.component";
import { CatalogComponent } from "@app-pages/catalog/catalog.component";
import { CategoryComponent } from "@app-pages/category/category.component";
import { EyesComponent } from "@app-pages/eyes/eyes.component";
import { FaceComponent } from "@app-pages/face/face.component";
import { FavoritesComponent } from "@app-pages/favorites/favorites.component";
import { HomeComponent } from "@app-pages/home/home.component";
import { LipsComponent } from "@app-pages/lips/lips.component";
import { NailsComponent } from "@app-pages/nails/nails.component";
import { ProductDetailsComponent } from "@app-pages/product-details/product-details.component";

const routes: Routes = [
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
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
