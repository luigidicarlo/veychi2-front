import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  recoverPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  submitted = false;
  error = false;
  passwordChanged = false;

  constructor(
    public userService: UserService,
    public activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    console.log("PROBANDO");
    console.log(this.activatedRoute.snapshot.params.token);
  }

  async onSubmit() {
    this.submitted = true;
    const user = {
      password: this.recoverPasswordForm.get('password').value as string,
      token: this.activatedRoute.snapshot.params.token
    };

    try {
      const updatedUser = await this.userService.recoverPassword(user).catch(err => {
        throw err;
      });
      this.passwordChanged = true;
      this.submitted = false;
    } catch (err) {
      this.submitted = false;
      this.error = true;
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error",
        icon: "error"
      });
    }
  }

}
