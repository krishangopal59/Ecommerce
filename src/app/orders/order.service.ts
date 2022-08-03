import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  getOrder(){
    return this.http.post("http://localhost:3000/user/order",{userId:localStorage.getItem("customerId")});
  }
}
