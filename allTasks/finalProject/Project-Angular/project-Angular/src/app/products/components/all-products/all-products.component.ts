import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: any[] = []
  categories: any[] = []
  loading: boolean = false
  cardProducts: any[] = []
  p: number = 1

  img: string = "product1656534428162.jpg"

  constructor(public service: ProductsService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }
  getProducts() {
    this.loading = true
    this.service.getAllProducts().subscribe((res) => {
      this.loading = false
      // console.log(res);
      this.products = res.data
    }, error => {
      this.loading = false
      alert("Error")
    })
  }
  getCategories() {
    this.loading = true
    this.service.getAllCategories().subscribe((res) => {
      console.log(res.data);

      this.loading = false
      // console.log(res);
      this.categories = res.data
    }, error => {
      this.loading = false
      alert("Error")
    })
  }
  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cardProducts = JSON.parse(localStorage.getItem("cart")!)
      const exist = this.cardProducts.find(product => product.item._id == event.item._id)
      if (exist) {
        alert("Product is already in your cart")
      } else {
        this.cardProducts.push(event)
        localStorage.setItem("cart", JSON.stringify(this.cardProducts))
      }
    } else {
      this.cardProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cardProducts))
    }
  }
  // filterCategory(event: any) {
  //   let value = event.target.value
  //   value == "all"?this.products:this.getProductsCategory(value)
  // }
  // getProductsCategory(key: string) {
  //   this.service.getProductsByCategory(key).subscribe((res: any) => {
  //     this.products = res
  //   })
  // }








}
