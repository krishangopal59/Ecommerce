import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ListingService } from "./listing.service";
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  products: any = [];

  constructor(private listingService:ListingService, public dialog:MatDialog ,public router:Router) { }

  ngOnInit(): void {
    this.listingProducts();
  }
  listingProducts(){
    this.listingService.listProducts().subscribe((result=>{
      this.products = result;
    }))
  }
  addToCart(id :string,price:string){
    let customerId = localStorage.getItem("customerId");
    if(customerId){
      let cartData = {
        productId:id,
        quantity:1,
        userId:customerId,
        unitPrice:price
      }
      this.listingService.addProductToCart(cartData).subscribe(response=>{
      });
      this.openDialog();
    }else{
      alert("Please login as customer");
    }
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
