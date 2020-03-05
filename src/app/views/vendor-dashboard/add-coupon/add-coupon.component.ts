import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import Coupon from '../../../models/coupon.model';
import { CouponService } from '../../../services/coupon.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

  /* Campos del formulario */
  couponForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'_ -]+$'), Validators.minLength(3)]),
    expiration: new FormControl('', [Validators.required, Validators.minLength(1)]),
    value: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
    percentage: new FormControl('', Validators.required)    
  });

  token: string = ''; // Token del usuario
  submitted = false; // Booleano para determinar si se hizo submit
  error = false; // Booleano para determinar si hubo un error.
  edit: boolean = false; // Booleano para determinar si se está editando un cupón
  singleCoupon: any; // Cupón que se está editando
  coupon: Coupon; // Cupón que se va a registrar

  constructor(public couponService: CouponService, public auth: AuthService,
  public router: Router, public activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.token = this.auth.loadSession();
    const params = this.activedRoute.snapshot.params;
    if(params.name) {
      this.edit = true;
      this.findCoupon(params.name, this.token);
    }        
  }

  //Método para ejecutar la creación del cupón
  async onSubmit() {
    Swal.fire("Procesando...");
    Swal.showLoading();
    this.submitted = true;
    this.fillFields();
    try {
      const createdCoupon = await this.couponService.createCoupon(this.coupon, this.token).catch(err => {
        throw err;
      });      
      Swal.fire({
        title: "Cupón creado",
        icon: "success",
        html: `Se ha creado el cupón ${createdCoupon.name}`
      });
      this.router.navigate(['/vendor-panel/cupones']);
    } catch (err) {
      console.log(err);
      this.submitted = false;
      this.error = true;
      Swal.fire({
        title: "Error",
        icon: "error",
        html:
          "Ha ocurrido un error al tratar de crear el cupón.<br>Verifica los datos e intenta de nuevo"
      });
    }

  }

  //Método para ejecutar la edición del cupón
  async onEdit() {
    Swal.fire("Procesando...");
    Swal.showLoading();
    this.submitted = true;
    this.fillFields();
    console.log(this.coupon);
    try {
      const updatedCoupon = await this.couponService.updateCoupon(this.singleCoupon._id, this.coupon, this.token).catch(err => {
        throw err;
      });      
      Swal.fire({
        title: "Cupón actualizado",
        icon: "success",
        html: `Se ha actualizado el cupón ${updatedCoupon.name}`
      });
      this.router.navigate(['/vendor-panel/cupones']);
    } catch (err) {
      console.log(err);
      this.submitted = false;
      this.error = true;
      Swal.fire({
        title: "Error",
        icon: "error",
        html:
          "Ha ocurrido un error al tratar de actualizar el cupón.<br>Verifica los datos e intenta de nuevo"
      });
    }
  }

  //Método para guardar los datos del formulario en la variable 'coupon'
  fillFields() {
    this.coupon = new Coupon(
      null,
      this.couponForm.get('name').value as string,
      this.couponForm.get('expiration').value as Date,
      this.couponForm.get('value').value as number,
      this.couponForm.get('percentage').value as boolean,
      null,
      null,
      null,
      null,
      null
    );
  }

  //Método para obtener el cupón que se quiere editar
  async findCoupon(name: string, token: string) {
    try {
      this.singleCoupon = await this.couponService.getCoupon(name, token).catch(err => {
        throw err;
      });
    } catch (err) {
      console.log(err);
    }
  }  

}
