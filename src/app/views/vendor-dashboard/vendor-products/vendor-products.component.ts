import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import Product from 'src/app/models/product.model';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-vendor-products',
  templateUrl: './vendor-products.component.html',
  styleUrls: ['./vendor-products.component.css']
})
export class VendorProductsComponent implements OnInit {

  products: Product;

  actualPage: number = 1;

  token: any;

  constructor(public productService: ProductService, public auth: AuthService,
    public router: Router) { }

  ngOnInit() {
    this.token = this.auth.loadSession();
    this.showProducts();
  }

  async showProducts() {
    try {
      this.products = await this.productService.getProducts().catch(err => {
        throw err;
      }) as Product;
    } catch (err) {
      console.log(err);
    }
  }

  editProduct(id: string) {
    this.router.navigate([`/vendor-panel/editar-producto/${id}`]);
  }

  async eraseProduct(id: string) {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertirlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    });
    if (result.value) {
      try {
        const deletedProduct = await this.productService.deleteProduct(id, this.token).catch(err => {
          throw err;
        });
        this.showProducts();
        Swal.fire(
          'Producto eliminado',
          'El producto ha sido eliminado',
          'success'
        )
      } catch (err) {
        Swal.fire({
          title: "Error",
          icon: "error",
          html:
            "Ha ocurrido un error al tratar de eliminar el producto. Intente de nuevo"
        });
      }
    }
    
  }

}
