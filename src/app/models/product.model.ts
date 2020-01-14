import { Store } from './store.model';

export default class Product {
    constructor(
        public _id: string,
        public name: string,
        public shortDescription: string,
        public description: string,
        public images: string[],
        public tags: string[],
        public price: number,
        public discount: number,
        public store: Store,
        public createdAt: Date,
        public updatedAt: Date
    ) {}

}