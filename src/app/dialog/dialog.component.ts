import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  type: string = "";
  updateForm = new FormGroup({
    name: new FormControl(['',Validators.required]),
    price: new FormControl(['',Validators.required]),
    fileName: new FormControl(['',Validators.required])
  });
  imageSrc = "";
  cart:any = [];
  totalCost = 0;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogService:DialogService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit(): void {
        this.type = this.data.dialogFor;
        if(this.type == 'Update'){
          let vendorId = localStorage.getItem('vendorId');
          if(vendorId && this.data.productId)
          {
            this.dialogService.fetchProduct(this.data.productId,vendorId).subscribe((response:any)=>{
              this.updateForm.setValue({
                name: response.name,
                price: response.price,
                fileName: response.fileName,
              })
              this.imageSrc = response.fileName
            });
          }
        }
        if(this.type == 'cart'){
          this.FetchCartDetails();
          
        }
    }
    FetchCartDetails(){
      this.totalCost = 0;
      let customerId = localStorage.getItem("customerId");
      this.dialogService.fetchCartProducts({userId:customerId}).subscribe((response:any)=>{
        this.cart = response;
        response.map((row:any)=>{
            this.totalCost += row.unitPrice;
        })
      })
    }
    onSubmit(){
      let formData = {
        name:this.updateForm.value.name,
        price:this.updateForm.value.price,
        vendorId: localStorage.getItem('vendorId'),
        productId:this.data.productId
      };
      this.dialogService.updateProduct(formData).subscribe(result=>{
        if(result)location.reload();
      });
    }
    removeProduct(productId:any){
      let cartData = {
        productId:productId,
        userId:localStorage.getItem("customerId"),
      }
      this.dialogService.removeProduct(cartData).subscribe(result=>{
        // if(result)location.reload();
        this.FetchCartDetails();
      });
      
    }
    
  }
  
  // var formData: any = new FormData();
  // formData.append("image", this.updateForm.value.fileName);
  // formData.append("name", this.updateForm.value.name);
  // formData.append("price", this.updateForm.value.price);
  // formData.append("vendorId", localStorage.getItem('vendorId'));
  
  // onImagePicked(event:Event){
    //   if(event){
      //     const file = (event.target as HTMLInputElement).files;
      //     if(file){
        //       this.updateForm.patchValue({fileName: file[0]});
        //     }
        //   }
        // }