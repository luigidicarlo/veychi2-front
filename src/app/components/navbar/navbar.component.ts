import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { Response } from 'src/app/models/response.model';

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
