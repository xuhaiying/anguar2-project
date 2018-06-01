import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input()
  orderItem: any;
  orderCardClassName: string = 'order-card ordr-card-default';
  constructor() { }

  ngOnInit() {
    let statusId = this.orderItem["statusId"];
    if (statusId === '0'){
      this.orderCardClassName = 'order-card ordr-card-primary';
    } else if (statusId === '1') {
      this.orderCardClassName = 'order-card ordr-card-success';
    } else {
      this.orderCardClassName = 'order-card ordr-card-default';
    }
  }

}
