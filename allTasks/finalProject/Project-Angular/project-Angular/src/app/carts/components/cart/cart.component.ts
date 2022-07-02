import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cardProducts: any[] = [];
  total: any = 0
  success: boolean = false
  constructor(private service: CartsService) { }


  ngOnInit(): void {
    this.getCartProducts()


  }

  getCartProducts() {
    if ("cart" in localStorage) {
      this.cardProducts = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotal()
  }
  getCartTotal() {
    this.total = 0
    for (let x in this.cardProducts) {
      this.total += this.cardProducts[x].item.price * this.cardProducts[x].quantity;
    }
  }
  addAmount(i: any) {
    this.cardProducts[i].quantity++
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cardProducts))
  }
  minsAmount(i: any) {
    this.cardProducts[i].quantity--
    if (this.cardProducts[i].quantity <= 0) this.cardProducts[i].quantity = 1
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cardProducts))
  }
  detectChange() {
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cardProducts))
  }
  deleteProduct(i: number) {
    // this.cardProducts = this.cardProducts.filter(p => p != i)
    this.cardProducts.splice(i, 1)
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cardProducts))
  }
  clearProducts() {
    this.cardProducts = []
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cardProducts))
  }
  addCart() {
    let products = this.cardProducts.map(item => {
      return { productId: item.item._id, quantity: item.quantity }
    })
    let model = {
      // userId:  ,
      itemId: products,
      totalPrice: this.total,
    }
    this.service.createNewCart(model).subscribe(res => {
      this.success = true
     }, err => {
      console.log(err);
    })
    console.log(model);
    console.log(this.cardProducts);

  }

}
