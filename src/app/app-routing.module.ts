import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
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
import { VendorSettingsComponent } from './views/vendor-dashboard/vendor-settings/vendor-settings.component';
import { VendorStatsComponent } from './views/vendor-dashboard/vendor-stats/vendor-stats.component';
import { PasswordRecoveryComponent } from './views/password-recovery/password-recovery.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';
import { AdminCategoriesComponent } from './views/admin-dashboard/admin-categories/admin-categories.component';
import { AdminHomeComponent } from './views/admin-dashboard/admin-home/admin-home.component';
import { AdminOrdersComponent } from './views/admin-dashboard/admin-orders/admin-orders.component';
import { CategoriesComponent } from './views/admin-dashboard/categories/categories.component';
import { VendorsRequestComponent } from './views/admin-dashboard/vendors-request/vendors-request.component';
import { AdminUsersComponent } from './views/admin-dashboard/admin-users/admin-users.component';
import { VentasComponent } from './views/admin-dashboard/ventas/ventas.component';
import { SearchComponent } from './views/search/search.component';
import { MiCuentaComponent } from './views/mi-cuenta/mi-cuenta.component';
import { ResumenComponent } from './views/mi-cuenta/resumen/resumen.component';
import { PedidosComponent } from './views/mi-cuenta/pedidos/pedidos.component';
import { ConfiguracionComponent } from './views/mi-cuenta/configuracion/configuracion.component';
import { ComoComprarComponent } from './views/como-comprar/como-comprar.component';
import { ComoVenderComponent } from './views/como-vender/como-vender.component';

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
    path: 'inicio-sesion',
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
    path: 'carrito',
    component: CartComponent
  },
  {
    path: 'busqueda/:keys',
    component: SearchComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'como-comprar',
    component: ComoComprarComponent
  },
  {
    path: 'como-vender',
    component: ComoVenderComponent
  },
  {
    path: 'mi-cuenta',
    component: MiCuentaComponent, children: [
      {
        path: '',
        component: ResumenComponent
      },
      {
        path: 'pedidos',
        component: PedidosComponent
      },
      {
        path: 'configuracion',
        component: ConfiguracionComponent
      }
    ]
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
        path: 'editar-producto/:id',
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
        path: 'editar-cupon/:name',
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
    path: 'categorias/:id',
    component: ProductCategoryComponent
  },
  {
    path: 'vendor-products/:id',
    component: ProductCategoryComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'password-recovery/:token',
    component: PasswordRecoveryComponent
  },
  {
    path: 'admin-panel',
    component: AdminDashboardComponent, children: [
      {
        path: '',
        component: AdminHomeComponent
      },
      {
        path: 'categorias',
        component: CategoriesComponent
      },
      {
        path: 'crear-categoria',
        component: AdminCategoriesComponent
      },
      {
        path: 'editar-categoria/:id',
        component: AdminCategoriesComponent
      },
      {
        path: 'solicitud-vendedores',
        component: VendorsRequestComponent
      },
      {
        path: 'usuarios',
        component: AdminUsersComponent
      },
      {
        path: 'ventas',
        component: VentasComponent
      },
      {
        path: 'pedidos',
        component: AdminOrdersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
