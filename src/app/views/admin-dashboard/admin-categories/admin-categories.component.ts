import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { Response } from '../../../models/response.model';
import Category from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { AuthService } from '../../../services/auth.service';

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

  constructor(public categoryService: CategoryService, public auth: AuthService,
    public router: Router, public activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.token = this.auth.loadSession();    
    this.showCategories();
  }

  async onSubmit() {
    this.submitted = true;
    this.fillFields();
    console.log(this.category);
    try {
      const createdCategory = await this.categoryService.createCategory(this.category, this.token).catch(err => {
        throw err;
      });      
      Swal.fire({
        title: "Categoría creada",
        icon: "success",
        html: `Se ha creado la categoría ${createdCategory.name}`
      });
      this.router.navigate(['/admin-panel/categorias']);
    } catch (err) {
      console.log(err);
      this.submitted = false;
      this.error = true;
      Swal.fire({
        title: "Error",
        icon: "error",
        html:
          "Ha ocurrido un error al tratar de crear la categoría.<br>Verifica los datos e intenta de nuevo"
      });
    }
  }

  async onEdit() {
    this.submitted = true;
    this.fillFields();
    console.log(this.category);
    console.log("Editando...");
    try {
      const updatedCategory = await this.categoryService.updateCategory(this.singleCategory._id, this.category, this.token).catch(err => {
        throw err;
      });      
      Swal.fire({
        title: "Categoría actualizada",
        icon: "success",
        html: `Se ha actualizado la categoría ${updatedCategory.name}`
      });
      this.router.navigate(['/admin-panel/categorias']);
    } catch (err) {
      console.log(err);
      this.submitted = false;
      this.error = true;
      Swal.fire({
        title: "Error",
        icon: "error",
        html:
          "Ha ocurrido un error al tratar de actualizar la categoría.<br>Verifica los datos e intenta de nuevo"
      });
    }
  }

  fillFields() {
    if(this.edit && this.singleCategory != null) {

      
    }

    this.category = new Category(
      null,
      this.categoryForm.get('name').value as string,
      this.categoryForm.get('parent').value == "0" ? null : this.categoryForm.get('parent').value as string,
      this.categoryForm.get('imageUrl').value as string,
      null,
      null,
      null
    );
  }

  async showCategories() {
    try {
      this.categories = await this.categoryService.getCategories().catch(err => {
        throw err;
      });
      const params = this.activedRoute.snapshot.params;
      if(params.id) {
        this.edit = true;
        this.singleCategory = this.categories.find(s => s._id == params.id);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
