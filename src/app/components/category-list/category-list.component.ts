import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Response } from 'src/app/models/response.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  categories: Category[] = []

  ngOnInit() {
    this.showCategories();
  }

  showCategories() {
    this.categoryService.getCategories().subscribe(
      (res: Response) => {
        if(res.ok) {
          this.categories = res.data;
        }
      },
      err => console.log(err)
    );
  }

}
