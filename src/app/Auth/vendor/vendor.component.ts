import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../authservice.service';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorLoginComponent implements OnInit {
  credentialError: boolean = false;
  InvalidEmail: boolean = false;
  InvalidPassword: boolean = false;
  constructor(private formBuilder: FormBuilder, private userauth : AuthserviceService, private loginService:AuthService, private router: Router) { }
  form:any =  FormGroup;
  SignUpForm:any = FormGroup;
  mode:string = "login";
  submitted = false;
  get f() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if(this.mode == 'login'){
      let value = this.loginService.logIn(this.form.value);
      value.subscribe((result:any)=>{
        if(result.message == "AUTH Success"){
          let token = result.token;
          let expirationToken = result.expiresIn;
          this.userauth.saveUserToken(token,expirationToken);
          localStorage.setItem('vendorId',result.result._id);
          this.router.navigate(['/vendor'])
          if(result.result.firstName){
            localStorage.setItem('Name',result.result.firstName+" "+result.result.lastName)
          }else{
            this.router.navigate(['/profile']);
          }
          if(result.result.image){
            localStorage.setItem('profileImage',result.result.image);
          }
        }else{
          this.credentialError = true;
          this.InvalidEmail = true;
          this.InvalidPassword = true;
          setTimeout(() => {
            this.credentialError = false;
            this.InvalidEmail = false;
            this.InvalidPassword = false;
          }, 5000);
        }
      })
    }else{
       let value = this.loginService.signIn(this.form.value);
       value.subscribe((response:any)=>{
         if(response.error){
           alert("message=> "+response.error.message)
         }
         if(response.message){
           setTimeout(() => {
             this.router.navigate(['/login']);
           }, 2000);
         }
       })
    }
  }
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/']);
    }
    if(location.pathname == "/login/vendor"){
      this.mode = "login";
      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        isVendor:[true]
      });
    }else{
      this.mode = "signup";
      this.SignUpForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNo: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        isVendor: [true],
      });
    }
  }
  SignIn() {
    if(this.SignUpForm.valid){
      let value = this.loginService.signIn(this.SignUpForm.value);
      value.subscribe((response: any) => {
        if (response.error) {
          alert('message=> ' + response.error.message);
        }
        if (response.message) {
          setTimeout(() => {
            this.router.navigate(['/login/vendor']);
          }, 2000);
        }
      });
    }
  }
}