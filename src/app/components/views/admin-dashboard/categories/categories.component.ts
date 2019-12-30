import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { AuthService } from '../../../../services/auth.service';
import { Response } from '../../../../models/response.model';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService, private auth: AuthService) { }

  token: any = '';
  categories: any[] = [];

  ngOnInit() {
    this.token = this.auth.loadSession();
    this.showCategories();
  }

  showCategories() {
    this.categoryService.getCategories().subscribe(
      (res: Response) => {
        this.categories = res.data;
      },
      err => console.log(err)
    );
  }

  onDelete(id: string) {
  console.log("Borrando...");
    this.categoryService.deleteCategory(id, this.token).subscribe(
      (res: Response) => {
        console.log("Borrado exitosamente");
        console.log(res);
        this.showCategories();
      },
      err => console.log(err)
    )
  }

}
