import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Cart } from '../../models/cart.model';
import Order from '../../models/order.model';
import Coupon from '../../models/coupon.model';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CouponService } from '../../services/coupon.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public couponForm = new FormGroup({
    coupon: new FormControl("", [
      Validators.minLength(3),
    ])
  });

  token: string;
  cart: any[] = [];
  coupon: Coupon;
  subtotal: number = 0;
  envio: number = 0;
  tax: number = 0;
  total: number = 0;
  couponId: string[] = [];
  productId: string[] = [];

  constructor(
    public cartService: CartService,
    public orderService: OrderService,
    public couponService: CouponService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.token = this.auth.loadSession();
    this.getCartProducts();
  }
  
  // Método para obtener a los productos del carrito
  getCartProducts() {
    this.cart = JSON.parse(this.cartService.getCart());
    console.log(this.cart);
    this.getTotal();
  }

  // Método para obtener el total del pedido
  getTotal() {
    this.subtotal = 0;
    if(this.cart) {
      this.cart.forEach((item) => {
        this.subtotal += item.price;
      });
    }
    this.total = this.subtotal + this.envio + this.tax;
  }

  // Método para borrar items del carrito
  async deleteCartProduct(index: number) {
    this.cart.splice(index, 1);
    await this.cartService.updateCart(this.cart);
    this.getCartProducts();
  }

  // Método para crear una orden
  async makeOrder() {
    Swal.fire("Procesando...");
    Swal.showLoading();
    if(this.couponForm.get('coupon').value != '') {
      console.log(this.couponForm.get('coupon').value);
      console.log("Se agregó cupon");
      const coupon = this.couponForm.get('coupon').value as string;
      this.findCoupon(coupon, this.token);
    }

    this.cart.forEach(product => {
      this.productId.push(product._id);
    });
    console.log(this.productId);

    const order = new Order(
      null,
      this.productId,
      this.couponId,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    );

    console.log(order);

    try {      
      const orderSubmitted = await this.orderService.createOrder(order, this.token).catch(err => {
        throw err;
      });

      Swal.fire({
        title: "Pedido realizado",
        text: `Se realizado un pedido exitosamente. Para más información revise la información del pedido en su perfil`,
        icon: "success"
      });
      this.cartService.deleteAllProducts();
      this.router.navigateByUrl("/mi-cuenta/pedidos");
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Ha habido un error al hacer el pedido",
        icon: "error"
      });
    }
  }

  async findCoupon(name: string, token: string) {
    try {
      this.coupon = await this.couponService.getCoupon(name, token).catch(err => {
        throw err;
      });
      this.couponId.push(this.coupon._id);
      console.log(this.couponId);
    } catch (err) {
      console.log(err);
    }
  }

}
