import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { ConstantsService } from "src/app/services/constants.service";
import { RegexService } from "src/app/services/regex.service";
import CustomValidators from "src/app/validators/custom-validators.validator";
import { UserService } from '../../services/user.service';
import User from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = new FormGroup(
    {
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(this.constants.usernameMinLength),
        Validators.maxLength(this.constants.usernameMaxLength),
        Validators.pattern(this.regex.username)
      ]),
      fname: new FormControl("", [
        Validators.required,
        Validators.minLength(this.constants.namesMinLength),
        Validators.maxLength(this.constants.namesMaxLength),
        Validators.pattern(this.regex.names)
      ]),
      lname: new FormControl("", [
        Validators.required,
        Validators.minLength(this.constants.namesMinLength),
        Validators.maxLength(this.constants.namesMaxLength),
        Validators.pattern(this.regex.names)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern(this.regex.emails)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(this.constants.usernameMinLength),
        Validators.maxLength(this.constants.usernameMaxLength)
      ]),
      repeatPassword: new FormControl("", [Validators.required]),
      tc: new FormControl('', Validators.requiredTrue)
    },
    CustomValidators.matchPasswords
  );
  
  submitted = false;
  registered = false;
  error = false;
  msg = '';

  constructor(public userService: UserService, public constants: ConstantsService,
    private regex: RegexService, private router: Router) { }

  ngOnInit() {
  }

  async onSubmit() {
    Swal.fire("Procesando...");
    Swal.showLoading();
    this.submitted = true;

    const user = new User(
      null,
      this.registerForm.get('username').value as string,
      this.registerForm.get('fname').value as string,
      this.registerForm.get('lname').value as string,
      this.registerForm.get('email').value as string,
      this.registerForm.get('password').value as string,
      null,
      null,
      null,
      null,
      null
    );    

    try {
      const createdUser = await this.userService.createUser(user).catch(err => {
        throw err;
      });
      this.registered = true;
      this.submitted = false;
      Swal.fire({
        title: "Usuario registrado",
        icon: "success",
        html: `Se ha creado al usuario ${createdUser.username}`
      });      
    } catch (err) {
      console.log(err);
      this.submitted = false;
      this.error = true;
      Swal.fire({
        title: "Error",
        icon: "error",
        html:
          "Ha ocurrido un error al tratar de registrar el usuario.<br>Verifica los datos e intenta de nuevo"
      });
    }
  }

}
