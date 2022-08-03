import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthserviceService } from "../authservice.service";
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  displayLogout: boolean = false;
  isVendor: boolean = false;
  isCustomer: boolean = false;
  userName:String = '';
  userProfile:String = '';
  data:Object = [];

  constructor(private router:Router,private authService:AuthserviceService,public dialog :MatDialog) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        if(localStorage.getItem('vendorId')){
          this.showLogout();
          this.isVendor = true;
        }
        if(localStorage.getItem('customerId')){
          this.showLogout();
          this.isCustomer = true;
        }
        this.userProfile = localStorage.getItem('profileImage')||'';
        this.userName = localStorage.getItem('Name')||'';
      }
    });
  }

  scrollProduct(){
    this.router.navigate(['/']);
    var element = window.document.getElementById("Products");
    if(element){
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  showLogout(){
    this.displayLogout = true;
  }
  logout(){
    this.displayLogout = false;
    this.isVendor = false;
    this.isCustomer = false;
    localStorage.clear();
    this.authService.userSessionCheck();
  }
  openDialog():void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "800px",
      data: {dialogFor:"cart"},
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
