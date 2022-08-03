import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }
  payment(){
    let id = localStorage.getItem('customerId');
    return this.http.post('http://localhost:3000/product/payment',{userId:id});
  }
}
