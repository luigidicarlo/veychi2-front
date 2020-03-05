import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { CategoryService } from '../../../services/category.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(public categoryService: CategoryService, public auth: AuthService) { }

  token: any = '';
  categories: any[] = [];

  ngOnInit() {
    this.token = this.auth.loadSession();
    this.showCategories();
  }

  async showCategories() {
    try {
      this.categories = await this.categoryService.getCategories().catch(err => {
        throw err;
      });
      console.log(this.categories);
    } catch (err) {
      console.log(err);
    }
  }

  async OnDelete(id: string) {
    try {
      const deletedCategory = await this.categoryService.deleteCategory(id, this.token).catch(err => {
        throw err;
      });
      this.showCategories();
      Swal.fire({
        title: "Categoría eliminada",
        icon: "success",
        html: `La categoría ${deletedCategory.name} ha sido eliminada`
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        icon: "error",
        html:
          "Ha ocurrido un error al tratar de eliminar la categoría. Intente de nuevo"
      });
    }
  }

}
