import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
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
