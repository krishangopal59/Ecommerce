import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  updateProfile:boolean = false;
  userDetails:any = [];
  formData: any = new FormData();
  ProfileForm:FormGroup = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl(''),
    phoneNo: new FormControl('',[Validators.required]),
    image:new FormControl(''),
  })
  BillingForm:FormGroup = new FormGroup({
    address:new FormControl("",[Validators.required]),
    city:new FormControl("",[Validators.required]),
    state:new FormControl("",[Validators.required]),
    country:new FormControl("",[Validators.required]),
    zipCode:new FormControl("",[Validators.required])
  })
  constructor(public profileService:ProfileService) { }
  
  ngOnInit(): void {
    // disable email input field 
    this.ProfileForm.controls['email'].disable();
    this.profileService.fetchUser().subscribe((result:any)=>{
      this.userDetails = result.user;
      if(!result.user.firstName){
        this.updateProfile = true;
      }
      this.ProfileForm.setValue({
        image:result.user.image ||"",
        email: result.user.email||'',
        firstName: result.user.firstName||"",
        lastName: result.user.lastName||'',
        phoneNo: result.user.phoneNo||"",
      });
      if(result.user.billingAddress){
        this.BillingForm.setValue({
          address:result.user.billingAddress.address,
          city:result.user.billingAddress.city,
          state:result.user.billingAddress.state,
          country:result.user.billingAddress.country,
          zipCode:result.user.billingAddress.zipCode
        })
      }
    })
  }
  UpdateProfile(){
    if(this.ProfileForm.valid){
      this.formData.append("id", localStorage.getItem('customerId')||localStorage.getItem('vendorId'));
      this.formData.append("firstName", this.ProfileForm.value.firstName);
      this.formData.append("lastName", this.ProfileForm.value.lastName);
      this.formData.append("phoneNo", this.ProfileForm.value.phoneNo);
      this.profileService.updateUser(this.formData).subscribe((response:any)=>{
        if(response){
          this.userDetails = response;
          this.formData = new FormData();
          this.ProfileForm.setValue({
            image:"",
            email: response.email||'',
            firstName: response.firstName||"",
            lastName: response.lastName||'',
            phoneNo: response.phoneNo||"",
          });
          localStorage.setItem('Name',response.firstName+" "+response.lastName);
          localStorage.setItem('profileImage',response.image);
          this.updateProfile = false;
        }
      });
    }
  }
  onImagePicked(event:Event){
    if(event){
      const file = (event.target as HTMLInputElement).files;
      if(file){
        this.formData.append("image", file[0]);
        const reader = new FileReader();
        reader.onload = () => {
          this.userDetails.image = reader.result as string;
        };
        reader.readAsDataURL(file[0]);
      }
    }
  }

  updateBillingAdd(){
    if(this.BillingForm.valid){
      this.formData = new FormData();
      this.formData.append("id", localStorage.getItem('customerId')||localStorage.getItem('vendorId'));
      this.formData.append("billingAddress", JSON.stringify(this.BillingForm.value));
      this.profileService.updateUser(this.formData).subscribe((response:any)=>{
        if(response){
          this.updateProfile = false;
        }
      });
    }
  }

}
