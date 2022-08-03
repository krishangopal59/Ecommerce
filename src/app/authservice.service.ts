import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  
  constructor(private route:Router) { }
  
  public saveUserToken(token:string ,duration:any){
    localStorage.setItem("token",token);
    const now = new Date();
    let expirationDate = new Date(
      now.getTime() + duration * 1000
    );
    localStorage.setItem("duration",expirationDate.toISOString());
  }
  public userSessionCheck(){
    let saveduration:any = localStorage.getItem("duration");
    if(!saveduration){
      if(location.pathname != "/" && location.pathname != "/signin" && location.pathname != "/login/vendor" && location.pathname != "/signin/vendor" )
      this.route.navigate(['/login']);
    }
    let duration:any = new Date(saveduration);
    const now = new Date();
    if(now > duration.getTime()){
      localStorage.clear();
    }
  }
}