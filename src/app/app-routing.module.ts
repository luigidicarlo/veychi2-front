import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
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
import { VendorSettingsComponent } from './components/views/vendor-dashboard/vendor-settings/vendor-settings.component';
import { VendorStatsComponent } from './components/views/vendor-dashboard/vendor-stats/vendor-stats.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: 'contacto',
    component: ContactFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'registro-de-vendedores',
    component: VendorRegisterComponent
  },
  {
    path: 'single-product/:id',
    component: SingleProductComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'vendor-panel',
    component: VendorDashboardComponent, children: [
      {
        path: '',
        component: VendorHomeComponent
      },
      {
        path: 'productos',
        component: VendorProductsComponent
      },
      {
        path: 'crear-producto',
        component: AddProductComponent
      },
      {
        path: 'pedidos',
        component: VendorOrdersComponent
      },
      {
        path: 'cupones',
        component: VendorCouponsComponent
      },
      {
        path: 'crear-cupon',
        component: AddCouponComponent
      },
      {
        path: 'estadisticas',
        component: VendorStatsComponent
      },
      {
        path: 'ajustes',
        component: VendorSettingsComponent
      }
    ]
  },
  {
    path: 'categorias/:name',
    component: ProductCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }