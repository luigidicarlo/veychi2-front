import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Response } from '../../../models/response.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zñÑ0-9]+$'), Validators.minLength(8)]),
    fname: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+$'), Validators.minLength(3)]),
    lname: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+$'), Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    tc: new FormControl('', Validators.requiredTrue)
  });
  
  submitted = false;
  registered = false;
  error = false;
  msg = '';

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    const user = {
      
      username: this.registerForm.get('username').value as string,
      fname: this.registerForm.get('fname').value as string,
      lname: this.registerForm.get('lname').value as string,
      email: this.registerForm.get('email').value as string,
      password: this.registerForm.get('password').value as string
    };    

    this.userService.createUser(user).subscribe(
      (res: Response) => {
        console.log(res);
        if(res.ok) {
          console.log(user);          
          this.registered = true;
          this.submitted = false;
          //this.router.navigate(['/inicio']);
        }
      },
      err => {
        this.error = true;
        console.log(err);
        this.submitted = false;
      }
    );
  }

}
