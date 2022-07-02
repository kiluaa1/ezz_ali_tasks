import { Observable, observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  // publicUrl = "http://dashboard.roshetah.com/api/auth"
  publicUrl = "http://localhost:3000/user"
  public imgUrl ="http://localhost:3000/"


  public isLogin: boolean = false
  public UserData: any


  constructor(private http: HttpClient) { }
  register(obj: any): Observable<any> {
    return this.http.post(`${this.publicUrl}/register`, obj)
  }
  login(obj: any): Observable<any> {
    const header= new HttpHeaders
    return this.http.post(`${this.publicUrl}/login`, obj)
  }
  logout():Observable<any>{
    return this.http.post(`${this.publicUrl}/logout`, null)
  }

  AuthMe(): Observable<any> {
    return this.http.get(`${this.publicUrl}/single`)
  }


}
