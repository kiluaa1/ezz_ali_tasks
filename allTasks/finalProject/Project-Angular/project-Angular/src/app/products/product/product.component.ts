import { ProductsService } from '../services/products.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() data: any = []
  @Output() item = new EventEmitter()
  @Output() p: number = 1
  addButton: boolean = false
  amount: number = 0
  constructor(public service: ProductsService) { }

  ngOnInit(): void {
  }
  add() {
    this.item.emit({ item: this.data, quantity: this.amount })
  }

}
