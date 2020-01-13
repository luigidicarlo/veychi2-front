import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AdminService } from '../../../../services/admin.service';
import { Response } from '../../../../models/response.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  token: any = '';
  users: any;
  actualPage: number = 1;	

  constructor(public auth: AuthService, public adminService: AdminService) { }

  ngOnInit() {
  	this.token = this.auth.loadSession();
    this.showUsers();
  }

  showUsers() {
    this.adminService.getUsers(this.token).subscribe(
      (res: Response) => {        
        if(res.ok) {
          this.users = res.data;
          console.log(this.users);
        }        
      },
      err => console.log(err)
    );
  }

  eraseUser(id: string) {
  	this.adminService.deleteUser(id, this.token).subscribe(
  	  (res: Response) => {
  	  	console.log(res);
  	  	this.showUsers();
  	  },
  	  err => console.log(err)
  	);
  }

}
