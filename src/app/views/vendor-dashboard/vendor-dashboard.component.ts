import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit {

  store: any = {};
  token: any = "";
  hasStore: boolean = false;

  constructor(public storeService: StoreService, public auth: AuthService) { }

  ngOnInit() {
  	this.token = this.auth.loadSession();
  	this.getStoreData(this.token);
  }

  async getStoreData(token: any) {
    try {
      this.store = await this.storeService.getLoggedVendor(token).catch(err => {
        throw err;
      });
      if(this.store) {
        this.hasStore = true;
      }
    } catch (err) {
      console.log(err);
    }
  }

}
