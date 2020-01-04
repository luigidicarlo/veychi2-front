import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { Response } from '../../../../models/response.model';
import { CategoryService } from '../../../../services/category.service';
import { AuthService } from '../../../../services/auth.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    parent: new FormControl('', Validators.required),
    imageUrl: new FormControl('')
  });

  submitted = false;
  error = false;
  token: any = "";
  edit: boolean = false;
  singleCategory: any = {};
  categories: any[] = [];
  noneCategory = "0";
  category: any = {};

  constructor(private categoryService: CategoryService, private auth: AuthService,
    private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.token = this.auth.loadSession();    
    this.showCategories();
  }

  onSubmit() {
    this.submitted = true;
    this.fillFields();
    console.log(this.category);
    this.categoryService.createCategory(this.category, this.token).subscribe(
      (res: Response) => {
        console.log(res);
        if(res.ok) {
          this.router.navigate(['/admin-panel/categorias']);
        }        
      },
      err => {
        console.log(err);
        this.submitted = false;
        this.error = true;
      }
    );
  }

  onEdit() {
    this.fillFields();
    console.log(this.category);
    console.log("Editando...");
    this.categoryService.updateCategory(this.singleCategory._id, this.category, this.token).subscribe(
      res => {
        console.log("Edición exitosa");
        console.log(res);
        if(res.ok) {
          this.router.navigate(['/admin-panel/categorias']);
        }
      },
      err => {
        console.log(err);
        this.submitted = false;
        this.error = true;
      }
    );
  }

  fillFields() {
    this.category = {
      name: this.categoryForm.get('name').value as string,
      parent: this.categoryForm.get('parent').value == "0" ? null : this.categoryForm.get('parent').value as string,
      imageUrl: this.categoryForm.get('imageUrl').value as string
    };
  }

  showCategories() {
    this.categoryService.getCategories().subscribe(
      (res: Response) => {
        if(res.ok) {
          this.categories = res.data;
          const params = this.activedRoute.snapshot.params;
          if(params.id) {
            this.edit = true;
            this.singleCategory = this.categories.find(s => s._id == params.id);
          }
        }               
      },
      err => console.log(err)
    );
  }
}
