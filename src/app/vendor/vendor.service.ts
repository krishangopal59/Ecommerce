import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http:HttpClient) { }
  addProduct(data: any){
    return this.http.post("http://localhost:3000/product",data);
  }
  listProducts(vendorId:any){
    return this.http.post('http://localhost:3000/product/vendor',{vendorId:vendorId});
  }
  deleteProduct(productId:string){
    return this.http.post('http://localhost:3000/product/delete',{productId:productId});
  }
}
