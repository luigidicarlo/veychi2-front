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
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public couponForm = new FormGroup({
    coupon: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ])
  });

  token: string;
  cart: any[] = [];
  coupon: Coupon;
  subtotal: number = 0;
  total: number = 0;
  couponId: string[] = [];
  productId: string[] = [];
  couponQuantity: string = '-';
  couponMatched: boolean = false;
  couponSubmitted: boolean = false;

  constructor(
    public cartService: CartService,
    public orderService: OrderService,
    public couponService: CouponService,
    public auth: AuthService,
    public payment: PaymentService,
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
    this.total = this.subtotal;
  }

  // Método para borrar items del carrito
  async deleteCartProduct(index: number) {
    this.cart.splice(index, 1);
    await this.cartService.updateCart(this.cart);
    this.getCartProducts();
  }

  // Método para crear una orden
  async makeOrder() {
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
      }) as any;
      /*Swal.fire({
        title: "Pedido realizado",
        text: `Se realizado un pedido exitosamente. Para más información revise la información del pedido en su perfil`,
        icon: "success"
      });*/

      // POST A LA RESPUESTA DE LA API DE UN PEDIDO
      const paymentRequested = await this.payment.requestPayment(orderSubmitted.url, orderSubmitted.inputName, orderSubmitted.token).catch(err => {
        throw err;
      }) as any;

      const redirectionRequested = await this.payment.requestRedirection(paymentRequested.url, paymentRequested.inputName, paymentRequested.token).catch(err => {
        throw err;
      }) as any;

      // this.cartService.deleteAllProducts();
      // this.router.navigateByUrl("/mi-cuenta/pedidos");
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Ha habido un error al hacer el pedido",
        icon: "error"
      });
    }
  }

  async applyCoupon() {
    const coupon = this.couponForm.get('coupon').value as string;
    Swal.fire("Procesando...");
    Swal.showLoading();   
    await this.findCoupon(coupon, this.token);
    if(this.coupon) {
      this.total = 0;
      this.cart.forEach(item => {
        if(item.store._id == this.coupon.store._id) {
          this.couponMatched = true;
          if (this.coupon.percentage) {
              item.price = item.price * (1 - (item.discount / 100) - (this.coupon.value / 100))
          } else {
              const diff = (item.price * (1 - (item.discount / 100))) - this.coupon.value;
              item.price = diff <= 0 ? 0 : diff;
          }
        }
        this.total += item.price;
      });

      this.cart = JSON.parse(this.cartService.getCart());

      if(this.couponMatched) {
        this.couponSubmitted = true;
        this.couponId.push(this.coupon._id);
        if(this.coupon.percentage) this.couponQuantity = `${this.coupon.value}%`;
        else this.couponQuantity = `${this.coupon.value} CLP`;
        Swal.fire({
          title: "Cupón aplicado",
          text: `Se ha aplicado un cupón exitosamente.`,
          icon: "success"
        });
      }else {
        Swal.fire({
          title: "Error",
          text: "El cupón no es aplicable a ningún producto del carrito",
          icon: "error"
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Cupón inválido",
        icon: "error"
      });
    }
  }

  async findCoupon(name: string, token: string) {
    Swal.fire("Procesando...");
    Swal.showLoading();
    try {
      this.coupon = await this.couponService.getCoupon(name, token).catch(err => {
        throw err;
      });      
      console.log(this.couponId);
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "Cupón inválido",
        icon: "error"
      });
    }
  }

}
