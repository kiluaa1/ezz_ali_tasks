import { ProductsService } from './../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id: any
  data: any = {}
  loading:boolean=false
  constructor(private route: ActivatedRoute, private service: ProductsService) {
    this.id = this.route.snapshot.paramMap.get("id")
    console.log(this.id);
  }
  ngOnInit(): void {
    this.getSingleProduct()
  }
  getSingleProduct() {
    this.loading =true
    this.service.getProductById(this.id).subscribe(res => {
      this.loading =false
      this.data = res.data
    },err=>{
      this.loading =false
      alert(err)
    })
  }
}

