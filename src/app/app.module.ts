import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
import { NgImageSliderModule } from 'ng-image-slider';
import { TagInputModule } from 'ngx-chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './views/home/home.component';
import { HeroHeaderComponent } from './components/hero-header/hero-header.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ContactFormComponent } from './views/contact-form/contact-form.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { SingleProductComponent } from './views/single-product/single-product.component';
import { CartComponent } from './views/cart/cart.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { VendorDashboardComponent } from './views/vendor-dashboard/vendor-dashboard.component';
import { VendorHomeComponent } from './views/vendor-dashboard/vendor-home/vendor-home.component';
import { VendorProductsComponent } from './views/vendor-dashboard/vendor-products/vendor-products.component';
import { AddProductComponent } from './views/vendor-dashboard/add-product/add-product.component';
import { VendorOrdersComponent } from './views/vendor-dashboard/vendor-orders/vendor-orders.component';
import { VendorCouponsComponent } from './views/vendor-dashboard/vendor-coupons/vendor-coupons.component';
import { AddCouponComponent } from './views/vendor-dashboard/add-coupon/add-coupon.component';
import { ProductCategoryComponent } from './views/product-category/product-category.component';
import { VendorRegisterComponent } from './views/vendor-register/vendor-register.component';
import { FooterComponent } from './components/footer/footer.component';
import { VendorSettingsComponent } from './views/vendor-dashboard/vendor-settings/vendor-settings.component';
import { VendorStatsComponent } from './views/vendor-dashboard/vendor-stats/vendor-stats.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { PasswordRecoveryComponent } from './views/password-recovery/password-recovery.component';
import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';
import { AdminCategoriesComponent } from './views/admin-dashboard/admin-categories/admin-categories.component';
import { AdminHomeComponent } from './views/admin-dashboard/admin-home/admin-home.component';
import { CategoriesComponent } from './views/admin-dashboard/categories/categories.component';
import { EditCategoryComponent } from './views/admin-dashboard/edit-category/edit-category.component';
import { VendorsRequestComponent } from './views/admin-dashboard/vendors-request/vendors-request.component';
import { AdminUsersComponent } from './views/admin-dashboard/admin-users/admin-users.component';
import { SearchComponent } from './views/search/search.component';
import { MiCuentaComponent } from './views/mi-cuenta/mi-cuenta.component';
import { ConfiguracionComponent } from './views/mi-cuenta/configuracion/configuracion.component';
import { PedidosComponent } from './views/mi-cuenta/pedidos/pedidos.component';
import { ResumenComponent } from './views/mi-cuenta/resumen/resumen.component';
import { ComoComprarComponent } from './views/como-comprar/como-comprar.component';
import { ComoVenderComponent } from './views/como-vender/como-vender.component';

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
    VendorStatsComponent,
    ForgotPasswordComponent,
    PasswordRecoveryComponent,
    AdminDashboardComponent,
    AdminCategoriesComponent,
    AdminHomeComponent,
    CategoriesComponent,
    EditCategoryComponent,
    VendorsRequestComponent,
    AdminUsersComponent,
    SearchComponent,
    MiCuentaComponent,
    ConfiguracionComponent,
    PedidosComponent,
    ResumenComponent,
    ComoComprarComponent,
    ComoVenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ChartsModule,
    NgImageSliderModule,
    TagInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
