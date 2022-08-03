import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  logIn(data:any){
    return this.http.post("http://localhost:3000/user/login",data);
  }
  signIn(data:any){
    return this.http.post("http://localhost:3000/user/signup",data);
  }
}
