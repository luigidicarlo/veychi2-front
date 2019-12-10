import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/utils/navbar/navbar.component';
import { HomeComponent } from './components/views/home/home.component';
import { HeroHeaderComponent } from './components/utils/hero-header/hero-header.component';
import { ProductsListComponent } from './components/utils/products-list/products-list.component';
import { CategoryListComponent } from './components/utils/category-list/category-list.component';
import { ContactFormComponent } from './components/views/contact-form/contact-form.component';
import { LoginComponent } from './components/views/login/login.component';
import { RegisterComponent } from './components/views/register/register.component';
import { SingleProductComponent } from './components/views/single-product/single-product.component';
import { CartComponent } from './components/views/cart/cart.component';
import { CheckoutComponent } from './components/views/checkout/checkout.component';
import { VendorDashboardComponent } from './components/views/vendor-dashboard/vendor-dashboard.component';
import { VendorHomeComponent } from './components/views/vendor-dashboard/vendor-home/vendor-home.component';
import { VendorProductsComponent } from './components/views/vendor-dashboard/vendor-products/vendor-products.component';
import { AddProductComponent } from './components/views/vendor-dashboard/add-product/add-product.component';
import { VendorOrdersComponent } from './components/views/vendor-dashboard/vendor-orders/vendor-orders.component';
import { VendorCouponsComponent } from './components/views/vendor-dashboard/vendor-coupons/vendor-coupons.component';
import { AddCouponComponent } from './components/views/vendor-dashboard/add-coupon/add-coupon.component';
import { ProductCategoryComponent } from './components/views/product-category/product-category.component';
import { VendorRegisterComponent } from './components/views/vendor-register/vendor-register.component';
import { FooterComponent } from './components/utils/footer/footer.component';
import { VendorSettingsComponent } from './components/views/vendor-dashboard/vendor-settings/vendor-settings.component';
import { VendorStatsComponent } from './components/views/vendor-dashboard/vendor-stats/vendor-stats.component';

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
    ProductCategoryComponent,
    VendorRegisterComponent,
    FooterComponent,
    VendorSettingsComponent,
    VendorStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }