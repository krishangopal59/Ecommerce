import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './Auth/customer/customer.component';
import { VendorLoginComponent } from './Auth/vendor/vendor.component';
import { HeaderComponent } from './header/header.component';
import { ListingComponent } from './listing/listing.component';
import { FooterComponent } from './footer/footer.component';
import { UploadComponent } from './vendor/upload/upload.component';
import { HttpClientModule } from "@angular/common/http";
import { VendorComponent } from './vendor/vendor.component';
import { VendorListingComponent } from './vendor/listing/listing.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from "@angular/material/input";
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    VendorLoginComponent,
    HeaderComponent,
    ListingComponent,
    FooterComponent,
    VendorComponent,
    UploadComponent,
    VendorListingComponent,
    CheckoutComponent,
    DialogComponent,
    ProfileComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
