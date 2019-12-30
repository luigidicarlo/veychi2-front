import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '../../../models/response.model';
import { UserService } from '../../../services/user.service';

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
    private userService: UserService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    console.log("PROBANDO");
    console.log(this.activatedRoute.snapshot.params.token);
  }

  onSubmit() {
    this.submitted = true;
    const user = {
      password: this.recoverPasswordForm.get('password').value as string,
      token: this.activatedRoute.snapshot.params.token
    };

    this.userService.recoverPassword(user).subscribe(
      (res: Response) => {
        if(res.ok) {
          this.passwordChanged = true;
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
