import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import Coupon from '../../../models/coupon.model';
import { CouponService } from '../../../services/coupon.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-vendor-coupons',
  templateUrl: './vendor-coupons.component.html',
  styleUrls: ['./vendor-coupons.component.css']
})
export class VendorCouponsComponent implements OnInit {

  coupons: Coupon;
  token: string;
  actualPage: number = 1;

  constructor(public couponService: CouponService, public auth: AuthService,
    public router: Router) { }

  ngOnInit() {
    this.token = this.auth.loadSession();
    this.showCoupons(this.token);
  }

  // Método para mostrar todos los cupones
  async showCoupons(token: string) {
    try {
      this.coupons = await this.couponService.getCoupons(token).catch(err => {
        throw err;
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Método para redirigir al formulario de edición de un cupón
  editCoupon(name: string) {
    this.router.navigate([`/vendor-panel/editar-cupon/${name}`]);
  }

  // Método para borrar un cupón
  async eraseCoupon(id: string) {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertirlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    });
    if (result.value) {
      try {
        const deletedCoupon = await this.couponService.deleteCoupon(id, this.token).catch(err => {
          throw err;
        });
        this.showCoupons(this.token);
        Swal.fire(
          'Cupón eliminado',
          'El cupón ha sido eliminado',
          'success'
        )
      } catch (err) {
        Swal.fire({
          title: "Error",
          icon: "error",
          html:
            "Ha ocurrido un error al tratar de eliminar el cupón. Intente de nuevo"
        });
      }
    }
  }

}
