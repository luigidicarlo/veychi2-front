import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { CategoryService } from '../../../services/category.service';
import { Response } from '../../../models/response.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categories: Category[] = [];

  constructor(
  	private auth: AuthService,
  	private userService: UserService,
  	private categoryService: CategoryService
  ) { }  

  ngOnInit() {
    this.showCategories();
  }

  showCategories() {
    this.categoryService.getCategories().subscribe(
      (res: Response) => {
        console.log(res);
        if(res.ok) {
          this.categories = res.data;
        }
      },
      err => console.log(err)
    );
  }

}
