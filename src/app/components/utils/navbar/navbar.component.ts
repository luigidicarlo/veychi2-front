import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  searchForm: FormGroup = new FormGroup({
    input: new FormControl('', Validators.required)
  });

  categories: Category[] = [];

  keys: string;

  constructor(
  	public auth: AuthService,
  	public userService: UserService,
  	private categoryService: CategoryService,
    public router: Router
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

  onSubmit() {
    const searchInput = this.searchForm.get('input').value as string;
    this.keys = searchInput.split(' ').join('+');    
    this.router.navigate([`/busqueda/${this.keys}`]);
  }

}
