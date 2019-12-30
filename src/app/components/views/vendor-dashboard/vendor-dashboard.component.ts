import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit {

  store: any = {};
  token: any = "";

  constructor(private userService: UserService, private auth: AuthService) { }

  ngOnInit() {
  	this.token = this.auth.loadSession();
  	this.getStoreData(this.token);
  }

  getStoreData(token: any) {
  	console.log("Probando tienda...");
  	this.userService.getLoggedVendor(token).subscribe(
      (res) => {
      	console.log("Prueba exitosa") ;
        this.store = res.data;
        console.log(this.store);
      },
      err => console.log(err)
    );
  }

}
