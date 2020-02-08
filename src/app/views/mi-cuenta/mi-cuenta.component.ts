import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {

  user: any;

  constructor(public router: Router, private userService: UserService, 
  private auth: AuthService) { 
  	this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
  	const token = this.auth.loadSession();
  	if(token) {
  		this.user = this.userService.getLoggedinUser(token)
	  		.then(user => {
	          this.user = user;
	        })
	        .catch(err => {
	          console.log(err);
	        });
  	}
  }

}