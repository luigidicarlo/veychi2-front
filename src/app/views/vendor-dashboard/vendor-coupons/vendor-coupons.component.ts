import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CouponService } from 'src/app/services/coupon.service';
import { AuthService } from 'src/app/services/auth.service';
import { Response } from 'src/app/models/response.model';

@Component({
  selector: "app-vendor-coupons",
  templateUrl: "./vendor-coupons.component.html",
  styleUrls: ["./vendor-coupons.component.css"]
})
export class VendorCouponsComponent implements OnInit {
  coupons: any = [];
  token: any;
  actualPage: number = 1;

  constructor(
    public couponService: CouponService,
    public auth: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.token = this.auth.loadSession();
    this.showCoupons();
  }

  showCoupons() {
    this.couponService.getCoupons(this.token).subscribe(
      (res: Response) => {
        console.log(res.data);
        if (res.ok) {
          this.coupons = res.data;
        }
      },
      err => console.log(err)
    );
  }

  editCoupon(name: string) {
    this.router.navigate([`/vendor-panel/editar-cupon/${name}`]);
  }

  eraseCoupon(id: string) {
    this.couponService.deleteCoupon(id, this.token).subscribe(
      (res: Response) => {
        console.log(res);
        if (res.ok) {
          this.showCoupons();
        }
      },
      err => console.log(err)
    );
  }
}
