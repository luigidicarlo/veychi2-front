import { Store } from './store.model';

export interface Product{
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    store: Store;
}