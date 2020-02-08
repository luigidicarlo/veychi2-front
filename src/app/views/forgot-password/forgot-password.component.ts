import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '../../models/response.model';
import { UserService } from '../../services/user.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  passwordForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required)
  });  

  aux = false;
  token = '';
  submitted = false;
  error = false;

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    const user = {
      username: this.passwordForm.get('username').value as string,
    };

    this.userService.forgotPassword(user).subscribe(
      (res: Response) => {
        if(res.ok) {
          this.aux = true;
          this.token = res.data;
          console.log(res);
          console.log(this.token);
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

}
