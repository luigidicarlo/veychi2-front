import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '../../../models/response.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-vendor-register',
  templateUrl: './vendor-register.component.html',
  styleUrls: ['./vendor-register.component.css']
})
export class VendorRegisterComponent implements OnInit {

  vendorForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[$0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\' ]+$'), Validators.minLength(8)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    rut: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+[-|‐]{1}[0-9kK]$'), Validators.minLength(10)]),
    activity: new FormControl('', [Validators.required, Validators.minLength(8)]),
    tc: new FormControl('', Validators.requiredTrue)
  });

  token: any = "";
  submitted = false;
  registered = false;
  error = false;

  constructor(public userService: UserService, public auth: AuthService) { }

  ngOnInit() {
    this.token = this.auth.loadSession();
    console.log(this.token);
  }

  onSubmit() {
    this.submitted = true;
    const user = {
      name: this.vendorForm.get('name').value as string,
      description: this.vendorForm.get('description').value as string,
      rut: this.vendorForm.get('rut').value as string,
      activity: this.vendorForm.get('activity').value as string
    };

    this.userService.vendorRequest(user, this.token).subscribe(
      (res: Response) => {
        if(res.ok) {
          console.log(user);
          console.log(res);
          this.verifyVendor(this.token); // EN PRODUCCIÓN DEBE HABER UNA VERIFICACIÓN DEL ADMIN ANTES DE EJECUTAR ESTE MÉTODO
          this.submitted = false;
        }
        
      },
      err => {
        console.log(err);
        this.submitted = false;
        this.error = true;
      }
    );
  }



  verifyVendor(token: any) {
    this.userService.getLoggedVendor(this.token).subscribe(
      (res: Response) => {
        console.log(res);
        this.userService.isVendor = true;
        this.registered = true;
        //this.router.navigate(['/inicio']);
      },
      err => {
        console.log(err);
        this.error = true;
      }
    );
  }

}
