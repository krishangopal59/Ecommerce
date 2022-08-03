import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }
  fetchUser(){
    let id = localStorage.getItem('customerId')||localStorage.getItem('vendorId');
    return this.http.post('http://localhost:3000/user/fetch',{id:id});
  }
  updateUser(data:any){
    return this.http.post('http://localhost:3000/user/updateUser',data);
  }
}
