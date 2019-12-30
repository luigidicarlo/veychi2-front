import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Response } from '../../../models/response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zñÑ0-9]+$'), Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  token: any = "";
  submitted = false;
  error = false;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
      this.token = this.auth.loadSession();
//    this.onLoggedIn(token);
  }

  onSubmit() {
    this.submitted = true;
    const user = {
      username: this.loginForm.get('username').value as string,
      password: this.loginForm.get('password').value as string
    };

    this.auth.login(user).subscribe(
      (token: Response) => {
        console.log(token);
        if(token.ok) {          
          this.auth.saveSession(token.data);
          this.onLoggedIn(token.data);
          console.log(token.data);
          this.verifyVendor(token.data);
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

  logout() {
    this.auth.user = null;
    this.auth.loggedIn = false;
    this.userService.isVendor = false;
    this.auth.deleteSession();
  }

  private onLoggedIn(token: string) {
    this.auth.getLoggedUser(token).subscribe(
      (res: Response) => {
        this.auth.user = res.data;
        this.auth.loggedIn = true;
        if(res.data.role == "ADMIN_ROLE") {
          this.router.navigate(['/admin-panel']);
        }
      },
      err => {
        this.auth.loggedIn = false;
      }
    );
  }

  verifyVendor(token: any) {
    console.log("Verificando...");
    this.userService.getLoggedVendor(token).subscribe(
      (res: Response) => {
        if(res.ok) {
          console.log("Verificado.");
          console.log(res);
          this.userService.isVendor = true;
          this.router.navigate(['/vendor-panel']);
        }
      },
      err => {
        if(err.status == 404) {
          console.log("Este usuario no posee tienda.");
        }
      }
    );
  }

}
