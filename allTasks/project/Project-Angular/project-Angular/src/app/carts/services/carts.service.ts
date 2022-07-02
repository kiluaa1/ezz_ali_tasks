import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  // publicOrderUrl = "http://localhost:3000/item/add"
  publicOrderUrl = "http://localhost:3000/order/add"

  constructor(private http:HttpClient) { }
  createNewCart(model:any){
    return this.http.post(this.publicOrderUrl,model)
  }



}
