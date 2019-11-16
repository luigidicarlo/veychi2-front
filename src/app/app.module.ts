import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HeroHeaderComponent } from './components/utils/hero-header/hero-header.component';
import { ProductsListComponent } from './components/utils/products-list/products-list.component';
import { CategoryListComponent } from './components/utils/category-list/category-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';
import { VendorHomeComponent } from './components/vendor-dashboard/vendor-home/vendor-home.component';
import { VendorProductsComponent } from './components/vendor-dashboard/vendor-products/vendor-products.component';
import { AddProductComponent } from './components/vendor-dashboard/add-product/add-product.component';
import { VendorOrdersComponent } from './components/vendor-dashboard/vendor-orders/vendor-orders.component';
import { VendorCouponsComponent } from './components/vendor-dashboard/vendor-coupons/vendor-coupons.component';
import { AddCouponComponent } from './components/vendor-dashboard/add-coupon/add-coupon.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HeroHeaderComponent,
    ProductsListComponent,
    CategoryListComponent,
    ContactFormComponent,
    LoginComponent,
    RegisterComponent,
    SingleProductComponent,
    CartComponent,
    CheckoutComponent,
    VendorDashboardComponent,
    VendorHomeComponent,
    VendorProductsComponent,
    AddProductComponent,
    VendorOrdersComponent,
    VendorCouponsComponent,
    AddCouponComponent,
    ProductCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
