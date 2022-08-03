import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  constructor(private http:HttpClient) { }
  listProducts(){
    return this.http.get('http://localhost:3000/product');
  }
  addProductToCart(data:any){
    return this.http.post('http://localhost:3000/product/addToCart',data);
  }
}
