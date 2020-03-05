import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public isProcessing = false;
  public loginForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32)
    ])
  });

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}

  async onSubmit() {
    const loginData = this.loginForm.value;
    this.isProcessing = true;

    try {
      Swal.fire("Procesando...");
      Swal.showLoading();
      const token = await this.auth.generateToken(loginData).catch(err => {
        throw err;
      });

      const user = await this.userService.getLoggedinUser(token).catch(err => {
        throw err;
      });

      Swal.fire({
        title: "Inicio de Sesión",
        text: `Te damos la bienvenida, ${user.fname}`,
        icon: "success"
      });

      this.auth.saveToken(token);
      this.auth.onLoginEmitter.emit(user);
      this.router.navigateByUrl("/");
    } catch (err) {
      Swal.fire({
        title: "Inicio de Sesión",
        text: "Has ingresado datos inválidos",
        icon: "error"
      });
      this.loginForm.patchValue({ password: "" });
    }
    this.isProcessing = false;
  }
}
