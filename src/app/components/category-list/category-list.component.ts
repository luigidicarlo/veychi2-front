import { Component, OnInit } from '@angular/core';
import Category from 'src/app/models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  categories: Category;

  ngOnInit() {
    this.showCategories();
  }

  async showCategories() {
    try {
      this.categories = await this.categoryService.getCategories().catch(err => {
        throw err;
      });
    } catch (err) {
      console.log(err);
    }
  }

}
