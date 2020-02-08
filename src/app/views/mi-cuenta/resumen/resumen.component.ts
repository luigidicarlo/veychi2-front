import { Component, OnInit } from '@angular/core';
import User from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  user: any;
  hasStore: boolean = false;

  constructor(private userService: UserService, private auth: AuthService,
  private storeService: StoreService) { }

  ngOnInit() {
  	const token = this.auth.loadSession();
  	if(token) {
  		this.user = this.userService.getLoggedinUser(token)
	  		.then(user => {
	          this.user = user;
            console.log(this.user);
	        })
	        .catch(err => {
	          console.log(err);
	        });
  	}
    this.getStore(token);
  }

  async getStore(token: string) {
    try {
      const store = await this.storeService.getLoggedVendor(token).catch(err => {
        throw err;
      });
      if(store) {
        this.hasStore = true;
      }      
    } catch (err) {
      console.log(err);
    }
  }

}
