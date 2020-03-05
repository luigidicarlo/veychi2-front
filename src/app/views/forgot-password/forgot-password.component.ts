import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from "sweetalert2";
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
  token: any;
  submitted = false;
  error = false;

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  async onSubmit() {
    this.submitted = true;
    const user = {
      username: this.passwordForm.get('username').value as string,
    };    
    try {
      this.token = await this.userService.forgotPassword(user).catch(err => {
        throw err;
      });
      this.aux = true;      
      console.log(this.token);
      this.submitted = false;
    } catch (err) {
      this.submitted = false;
      this.error = true;
      Swal.fire({
        title: "Error",
        text: "Este usuario no existe o está mal escrito",
        icon: "error"
      });      
    }
  }

}
