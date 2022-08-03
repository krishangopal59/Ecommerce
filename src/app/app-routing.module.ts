import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { CustomerComponent } from './Auth/customer/customer.component';
import { VendorComponent } from './vendor/vendor.component';
import { ProfileComponent } from './profile/profile.component';
import { VendorLoginComponent } from './Auth/vendor/vendor.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', component: ListingComponent },
  { path: 'login', component: CustomerComponent },
  { path: 'signin', component: CustomerComponent },
  { path: 'login/vendor', component: VendorLoginComponent },
  { path: 'signin/vendor', component: VendorLoginComponent },
  { path: 'vendor', component: VendorComponent},
  { path: 'checkout', component:CheckoutComponent},
  { path: 'profile', component:ProfileComponent},
  { path: 'order', component:OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
