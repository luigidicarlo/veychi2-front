import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    const token = this.auth.loadSession();
    this.onLoggedIn(token);
  }

  onSubmit() {
    const user = {
      username: this.loginForm.get('username').value as string,
      password: this.loginForm.get('password').value as string
    };

    this.auth.login(user).subscribe(
      (token: string) => {
        this.auth.saveSession(token);
        this.onLoggedIn(token);
      },
      err => console.log(err)
    );
  }

  logout() {
    this.auth.user = null;
    this.auth.loggedIn = false;
    this.auth.deleteSession();
  }

  private onLoggedIn(token: string) {
    this.auth.getLoggedUser(token).subscribe(
      (user: User) => {
        this.auth.user = user;
        this.auth.loggedIn = true;
      },
      err => {
        this.auth.loggedIn = false;
      }
    );
  }

}
