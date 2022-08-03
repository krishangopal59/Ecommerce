import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private http:HttpClient) { }
  fetchProduct(productId:string,vendorId:string){
    return this.http.post('http://localhost:3000/product/fetch',{productId:productId,vendorId:vendorId});
  }
  updateProduct(data:any){
    return this.http.post('http://localhost:3000/product/update',data);
  }
  fetchCartProducts(data:any){
    return this.http.post('http://localhost:3000/product/fetchCart',data);
  }
  removeProduct(data:any){
    return this.http.post('http://localhost:3000/product/remove',data);
  }
}
