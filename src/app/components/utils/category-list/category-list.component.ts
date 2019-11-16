import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor() { }

  categories: Category[] = [
    {
      id: '1',
      name: 'Comida'
    },
    {
      id: '2',
      name: 'Ropa'
    },
    {
      id: '3',
      name: 'Libros'
    },
    {
      id: '4',
      name: 'Electrodomésticos'
    }
  ];

  ngOnInit() {
  }

}
