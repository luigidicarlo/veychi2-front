import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Category from 'src/app/models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private categoryService: CategoryService, public activatedRoute: ActivatedRoute) { }

  categories: Category;

  ngOnInit() {
    this.showCategories();
  }

  async showCategories() {
    const params = this.activatedRoute.snapshot.params;
    console.log(params.id);
    try {
      this.categories = await this.categoryService.getCategory(params.id).catch(err => {
        throw err;
      });
    } catch (err) {
      console.log(err);
    }
  }

}
