import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productUrl = "http://localhost:3000/product/"
  categoryUrl = "http://localhost:3000/category/"
  public imgUrl = "http://localhost:3000/"

  constructor(private http: HttpClient) { }
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.productUrl}all`)
  }
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.categoryUrl}all`)
  }
  getProductsByCategory(key: string): Observable<any> {
    return this.http.get(`${this.categoryUrl}single/${key}`)
  }
  // getSingleProduct(id: any) {
  //   return this.http.get(`${this.productUrl}single/${id}`)
  // }

  // getProviders():Observable<any>{
  //   return this.http.post("http://dashboard.roshetah.com/api/auth/LoadProvidersBySlug/1/0/39" , {"role_id" : "Doctors"})
  // }


  getProductById(id: any): Observable<any> {
    return this.http.get('http://localhost:3000/product/single/'+id)
  }
}
