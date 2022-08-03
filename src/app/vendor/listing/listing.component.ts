import { MatDialog } from '@angular/material/dialog';
import { VendorService } from '../vendor.service';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-vendor-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class VendorListingComponent implements OnInit {
  products: any = [];

  constructor(private vendorService:VendorService,public dialog:MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('vendorId'))
    this.vendorService.listProducts(localStorage.getItem('vendorId')).subscribe(result=>{
      this.products = result;
    });
  }
  deleteProduct(id:any){
    this.vendorService.deleteProduct(id).subscribe(result=>{
      if(result){
        location.reload();
      }
    });
  }
  updateProduct(id:any){
    const dialogRef = this.dialog.open(DialogComponent, {
      width:'50%',
      data: {dialogFor:"Update",productId:id},
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
