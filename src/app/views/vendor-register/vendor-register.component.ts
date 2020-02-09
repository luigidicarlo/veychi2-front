import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import Store from '../../models/store.model';
import { Response } from '../../models/response.model';
import { ConstantsService } from "src/app/services/constants.service";
import { RegexService } from "src/app/services/regex.service";
import { StoreService } from '../../services/store.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import User from '../../models/user.model';

@Component({
  selector: 'app-vendor-register',
  templateUrl: './vendor-register.component.html',
  styleUrls: ['./vendor-register.component.css']
})
export class VendorRegisterComponent implements OnInit {

  public vendorForm = new FormGroup(
    {      
      storeName: new FormControl("", [
        Validators.required,
        Validators.minLength(this.constants.namesMinLength),
        Validators.maxLength(this.constants.namesMaxLength),
        Validators.pattern(this.regex.storeNames)
      ]),
      storeDescription: new FormControl("", [
        Validators.required,
        Validators.minLength(this.constants.shortDescMinLength),
        Validators.maxLength(this.constants.shortDescMaxLength),
      ]),
      rut: new FormControl("", [
        Validators.required,
        Validators.pattern(this.regex.rut)
      ]),
      storeActivity: new FormControl("", [
        Validators.required,
        Validators.minLength(this.constants.namesMinLength),
        Validators.maxLength(this.constants.namesMaxLength),
      ]),
      tc: new FormControl('', Validators.requiredTrue)
    }
  );

  token: any = "";
  submitted = false;
  registered = false;
  error = false;

  constructor(public userService: UserService, public auth: AuthService,
    public storeService: StoreService, public constants: ConstantsService,
    private regex: RegexService) { }

  ngOnInit() {
    this.token = this.auth.loadSession();
    if(this.token) {
      this.verifyVendor(this.token);
    }    
    console.log(this.token);
  }

  async onSubmit() {
    this.submitted = true;
    const store = new Store (
      null,
      this.vendorForm.get('storeName').value as string,
      this.vendorForm.get('storeDescription').value as string,
      null,
      null,
      this.vendorForm.get('rut').value as string,
      this.vendorForm.get('storeActivity').value as string,
      null,
      null,
      null,
      null
    );
    
    try {
      const createdStore = await this.storeService.vendorRequest(store, this.token).catch(err => {
        throw err;
      });
      this.verifyVendor(this.token); // EN PRODUCCIÓN DEBE HABER UNA VERIFICACIÓN DEL ADMIN ANTES DE EJECUTAR ESTE MÉTODO      
      this.submitted = false;
      Swal.fire({
        title: "Tienda creada",
        icon: "success",
        html: `Se ha creado la tienda ${createdStore.name}`
      });
      //this.router.navigate(['/']);
    } catch (err) {
      console.log(err);
      this.submitted = false;
      this.error = true;
      Swal.fire({
        title: "Error",
        icon: "error",
        html:
          "Ha ocurrido un error al tratar de crear la tienda.<br>Verifica los datos e intenta de nuevo"
      });
    }
  }

  async verifyVendor(token: any) {
    try {
      const store = await this.storeService.getLoggedVendor(token).catch(err => {
        throw err;
      });
      this.storeService.isVendor = true;
      this.registered = true;
    } catch (err) {
      console.log(err);
      this.error = true;
    }
  }

}
