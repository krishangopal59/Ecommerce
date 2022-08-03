import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogService } from './../dialog/dialog.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from "./../profile/profile.service";
import { CheckoutService } from './checkout.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart:any = [];
  userDetails:any = [];
  Total:any = 0 ;
  checked:boolean =true;
  billingForm : FormGroup = new FormGroup({
    address: new FormControl('',[Validators.required]),
    fullName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    state: new FormControl('',[Validators.required]),
    zipCode: new FormControl('',[Validators.required])
  })
  ShippingForm : FormGroup = new FormGroup({
    address: new FormControl('',[Validators.required]),
    fullName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    state: new FormControl('',[Validators.required]),
    zipCode: new FormControl('',[Validators.required])
  })
  constructor(public dialogService:DialogService, public profileService :ProfileService, public checkoutService:CheckoutService, public router:Router) {  }

  ngOnInit(): void {
    let customerId = localStorage.getItem('customerId');
    this.profileService.fetchUser().subscribe((result:any)=>{
      this.userDetails = result.user;
      if(this.userDetails["billingAddress"]){
        this.billingForm.setValue({
          fullName:  this.userDetails.firstName+" "+ this.userDetails.lastName,
          email: this.userDetails.email,
          address:this.userDetails.billingAddress.address,
          city: this.userDetails.billingAddress.city,
          state: this.userDetails.billingAddress.state,
          zipCode:  this.userDetails.billingAddress.zipCode
        });
        this.ShippingForm.setValue(this.billingForm.value);
      }
      else{
        alert("plz first update billing details in profile");
        this.router.navigate(['/profile'])
      }
    });
    this.dialogService.fetchCartProducts({userId:customerId}).subscribe((response:any)=>{
        this.cart = response;
      response.map((row:any)=>{
        this.Total +=  row.unitPrice;
      })
    });
  }
  showShippingAddress(){
    if(this.checked){
      this.checked =false
      this.ShippingForm.reset() 
    }
    else{ 
      this.checked =true
      this.ShippingForm.setValue(this.billingForm.value)
    }
  }
  redirectPaymentGateway(){
    this.checkoutService.payment().subscribe((value:any)=>{
      window.location.href = value.url;
    }); 
  }

}
