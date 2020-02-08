import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import CustomValidators from 'src/app/validators/custom-validators.validator';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  public user: User;
  public isProcessing = false;
  public userImage = "/assets/img/logo-veychi.png";

  public userEditForm = new FormGroup({
    email: new FormControl(),
    fname: new FormControl(),
    lname: new FormControl(),
    image: new FormControl()
  });

  public changePasswordForm = new FormGroup({
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(this.constants.usernameMinLength),
      Validators.maxLength(this.constants.usernameMaxLength)
    ]),
    repeatPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(this.constants.usernameMinLength),
      Validators.maxLength(this.constants.usernameMaxLength)
    ])
  }, CustomValidators.matchPasswords);

  constructor(
    private userService: UserService,
    private media: MediaService,
    private auth: AuthService,
    private constants: ConstantsService,
    private router: Router
  ) { }

  async ngOnInit() {
  	try {
      this.user = await this.userService.getLoggedinUser(this.auth.loadSession()).catch(err => {
        throw err;
      });
    } catch(err) {
      Swal.fire({
        title: "Se ha vencido tu sesión",
        icon: "warning",
        text: "Inicia sesión e intenta de nuevo"
      });
      this.router.navigateByUrl('/');
    }
  }

  async uploadImage() {
    const image = this.userEditForm.get('image').value as File;
    const formData = new FormData();
    const token = this.auth.loadSession();

    formData.append('images', image);

    try {
      const aux = await this.media.uploadImage(formData, token)
        .catch(err => { throw err; });
    } catch(err) {
      console.log(err);
    }
  }

  async onChangePasswordSubmit() {
    if (this.changePasswordForm.invalid) {
      Swal.fire({
        title: "Cambio de Contraseña",
        icon: "error",
        html: "Asegúrate de que hayas ingresado datos válidos e intenta de nuevo"
      });
    }

    const password = this.changePasswordForm.get("password").value as string;
    const token = this.auth.loadSession();

    this.changePasswordForm.reset();

    try {
      await this.userService.updatePassword(password, token).catch(err => {
        throw err;
      });
  
      Swal.fire({
        title: "Cambio de Contraseña",
        icon: "success",
        html: "Tu contraseña se ha actualizado con éxito"
      });
    } catch {
      Swal.fire({
        title: "Cambio de Contraseña",
        icon: "error",
        html: "Asegúrate de que hayas ingresado datos válidos e intenta de nuevo"
      });
    }
  }

}
