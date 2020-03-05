import Err from './err.model';
import Category from './category.model';
import Coupon from './coupon.model';
import Store from './store.model';
import User from './user.model';
import Order from './order.model';
import Product from './product.model';

// Representa la respuesta que se obtiene
// al realizar una petición asíncrona a la
// API.

// Nótese que ahora data está tipificada para 
// corresponderse con los modelos que se pueden
// recibir o en su defecto, si se obtiene sólo
// una cadena de texto como respuesta.

export default class Response {
  constructor(
    public ok: boolean,
    public data: Category | Coupon | Order | Product | Product[] | Store | User | string | boolean,
    public err: Err
  ) {}
}