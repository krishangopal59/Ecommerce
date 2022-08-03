import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthserviceService } from './authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce-demo';
  constructor(private authService:AuthserviceService, private router:Router){
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
          this.authService.userSessionCheck();
      }
   });
  }
}

