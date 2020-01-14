import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CouponService } from "src/app/services/coupon.service";
import { AuthService } from "src/app/services/auth.service";
import { Response } from "src/app/models/response.model";

@Component({
  selector: "app-add-coupon",
  templateUrl: "./add-coupon.component.html",
  styleUrls: ["./add-coupon.component.css"]
})
export class AddCouponComponent implements OnInit {
  couponForm: FormGroup = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ'_ -]+$"),
      Validators.minLength(3)
    ]),
    expiration: new FormControl("", [
      Validators.required,
      Validators.minLength(1)
    ]),
    value: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(1)])
    ),
    percentage: new FormControl("", Validators.required)
  });

  token: any = "";
  submitted = false;
  error = false;
  edit: boolean = false;
  singleCoupon: any = {};
  coupon: any = {};

  constructor(
    public couponService: CouponService,
    public auth: AuthService,
    public router: Router,
    public activedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.token = this.auth.loadSession();
    const params = this.activedRoute.snapshot.params;
    if (params.name) {
      this.edit = true;
      this.findCoupon(params.name);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.fillFields();
    console.log(this.coupon);
    this.couponService.createCoupon(this.coupon, this.token).subscribe(
      (res: Response) => {
        if (res.ok) {
          console.log(res);
          this.router.navigate(["/vendor-panel/cupones"]);
        }
      },
      err => {
        console.log(err);
        this.submitted = false;
        this.error = true;
      }
    );
  }

  onEdit() {
    this.submitted = true;
    this.fillFields();
    console.log("Editando...");
    this.couponService
      .updateCoupon(this.singleCoupon._id, this.coupon, this.token)
      .subscribe(
        res => {
          console.log("Edición exitosa");
          console.log(res);
          if (res.ok) {
            this.router.navigate(["/vendor-panel/cupones"]);
          }
        },
        err => {
          console.error(err);
          this.submitted = false;
          this.error = true;
        }
      );
  }

  fillFields() {
    this.coupon = {
      name: this.couponForm.get("name").value as string,
      expiration: this.couponForm.get("expiration").value as string,
      value: this.couponForm.get("value").value as number,
      percentage: this.couponForm.get("percentage").value as boolean
    };
  }

  findCoupon(name: string) {
    this.couponService.getCoupon(name, this.token).subscribe(
      (res: Response) => {
        console.log(res);
        if (res.ok) {
          this.singleCoupon = res.data;
        }
      },
      err => console.log(err)
    );
  }
}
