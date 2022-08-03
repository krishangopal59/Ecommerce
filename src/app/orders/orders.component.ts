import { OrderService } from './order.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  products: any =[];

  constructor(public orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrder().subscribe((response:any) => {
      response.orders.map((row:any)=>{
         _.map(JSON.parse(row.products), p => {
          let b  = _.findIndex(this.products,p.productId);
          if(b > -1) 
          this.products[b]["quantity"]+=1;
          else{
            p.productId["quantity"] = 1;
            this.products.push( p.productId);
          }
        });
        console.log(this.products)
      })
    });
  }

}