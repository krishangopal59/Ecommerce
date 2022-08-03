import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../authservice.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  credentialError: boolean = false;
  InvalidEmail: boolean = false;
  InvalidPassword: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private userauth: AuthserviceService,
    private loginService: AuthService,
    private router: Router
  ) {}
  LoginForm: any = FormGroup;
  SignUpForm: any = FormGroup;
  mode: string = 'login';
  submitted = false;
  get f() {
    return this.LoginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.LoginForm.invalid) {
      return;
    }
    this.loginService.logIn(this.LoginForm.value).subscribe((result: any) => {
      if (result.message == 'AUTH Success') {
        let token = result.token;
        let expirationToken = result.expiresIn;
        this.userauth.saveUserToken(token, expirationToken);
        localStorage.setItem('customerId', result.result._id);
        this.router.navigate(['/']);
        if (result.result.firstName) {
          localStorage.setItem('Name',result.result.firstName + ' ' + result.result.lastName);
        } else {
          this.router.navigate(['/profile']);
        }
        if (result.result.image) {
          localStorage.setItem('profileImage', result.result.image);
        }
      } else {
        this.credentialError = true;
        this.InvalidEmail = true;
        this.InvalidPassword = true;
        setTimeout(() => {
          this.credentialError = false;
          this.InvalidEmail = false;
          this.InvalidPassword = false;
        }, 5000);
      }
    });
  }
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
    if (location.pathname == '/login') {
      this.mode = 'login';
      this.LoginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        isVendor:[false]
      });
    } else {
      this.mode = 'signup';
      this.SignUpForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNo: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        isVendor: [false],
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
            this.router.navigate(['/login']);
          }, 2000);
        }
      });
    }
  }
}
