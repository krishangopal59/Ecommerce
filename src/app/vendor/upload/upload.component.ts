import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from "../vendor.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  addForm: FormGroup = new FormGroup({
    name:new FormControl('', [Validators.required, Validators.email]),
    price:new FormControl('', [Validators.required]),
    image:new FormControl("", [Validators.required]),
    vendorId: new FormControl('', Validators.required),
  });
  submitted :boolean = false;
  constructor(private router:Router, private vendorService:VendorService) { }
  get f() { return this.addForm.controls; }
  ngOnInit(): void {
    let vendorId = localStorage.getItem('vendorId');
    if(!vendorId){
      this.router.navigate(['/login']);
    }else{
      this.addForm.patchValue({vendorId : vendorId});
    }
  }
  onSubmit(){
    var formData: any = new FormData();
    formData.append("image", this.addForm.value.image);
    formData.append("name", this.addForm.value.name);
    formData.append("price", this.addForm.value.price);
    formData.append("vendorId", this.addForm.value.vendorId);
    this.vendorService.addProduct(formData).subscribe(result=>{
      if(result)location.reload();
    });
  }
  onImagePicked(event:Event){
    if(event){
      const file = (event.target as HTMLInputElement).files;
      if(file){
        this.addForm.patchValue({image: file[0]});
      }
    }
  }

}
