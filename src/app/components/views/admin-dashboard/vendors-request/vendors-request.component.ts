import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AdminService } from '../../../../services/admin.service';
import { Response } from '../../../../models/response.model';

@Component({
  selector: 'app-vendors-request',
  templateUrl: './vendors-request.component.html',
  styleUrls: ['./vendors-request.component.css']
})
export class VendorsRequestComponent implements OnInit {

  token: any = '';
  vendors: any;

  constructor(private auth: AuthService, private adminService: AdminService) { }

  ngOnInit() {
    this.token = this.auth.loadSession();
    this.showVendorRequest();
  }

  showVendorRequest() {
    this.adminService.getVendorRequests(this.token).subscribe(
      (res: Response) => {        
        if(res.ok) {
          this.vendors = res.data;
          console.log(this.vendors);
        }        
      },
      err => console.log(err)
    );
  }

  verifyVendor(id: string) {
    console.log(this.token);
    this.adminService.updateVendor(id, this.token).subscribe(
      (res) => {
        console.log(res);
        this.showVendorRequest();
      },
      err => console.error(err)
    );
  }

}
