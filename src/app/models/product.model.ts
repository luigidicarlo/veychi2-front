import { Category } from './category.model';

export interface Product{
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: Category;
}