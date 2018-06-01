import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import * as moment from 'moment';
import 'rxjs/Rx';
import { ActivatedRoute, Params } from '@angular/router';
import { DatepickerPopupComponent } from '../datepicker-popup/datepicker-popup.component';
import { MainComponent } from '../main/main.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  @ViewChild('mydatepicker')
  mydatepicker: DatepickerPopupComponent;
  userId: string;
  orderArray: Array < Object >; // 存放返回的订单数据
  status: string; // ALL/TODO/IN_PROGRESS/CANCELED/COMPLETED
  p = 1; // 当前页号
  maxSize: number = 10; // 分页最多显示maxSize页，超出的部分显示...
  bigTotalItems: number; // 总数据数量
  size: number = 30; // 每次从服务器获取size条数据
  searchText: string = '';// 搜索关键字
  searchType: string = 'default'; // default/searchDate/searchText 对应状态、日期、电话号/昵称三种查询方式
  // 用于btn-group模块显示
  btnArray = [{
      name: '全部订单',
      value: 'ALL'
    },
    {
      name: '待处理',
      value: 'TODO'
    },
    {
      name: '进行中',
      value: 'IN_PROGRESS'
    },
    {
      name: '已取消',
      value: 'CANCELED'
    },
    {
      name: '已完成',
      value: 'COMPLETED'
    }
  ];

  constructor(private http: Http, private routeInfo: ActivatedRoute, 
    private _parent: MainComponent, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.userId = this._parent.userId;
    // 订阅路由status参数 当status参数发生改变时触发getorderArray方法，重新获取订单数据
    this.routeInfo.queryParams.subscribe((params: Params) => {
      this.status = params["status"] || 'ALL';
      this.getorderArray();
    });
  }
  // 分页
  pageChanged(event: any): void {
    this.p = event.page;
    this.getorderArray();
  }
  getorderArray() {
    let start = (this.p - 1) * this.size;
    let status = this.status === 'ALL' ? '' : this.status;
    let url = '/daoway/rest/orders/v2/sold_by/' + this.userId + '?start=' + start + '&size=' + this.size + '&h5=1&channel=1'
    switch (this.searchType) {
      case 'searchDate':
        const startTime = moment(new Date(this.mydatepicker.startTime)).format("YYYY-MM-DD 00:00:00");
        const endTime = moment(new Date(this.mydatepicker.endTime)).format("YYYY-MM-DD 23:59:59");
        url += '&startTime=' + startTime + '&endTime=' + endTime;
      case 'default':
        url += '&status=' + status;
        break;
      case 'searchText':
        url += '&phone=' + this.searchText;
        break;
      default:
        url += '&status=' + status;
    }
    this.http.get(url).map(res => res.json()).subscribe((res) => {
      if (res.status === 'ok') {
        this.bigTotalItems = res.total;
        this.orderArray = res.data;
      } else {
        this.toastr.error(res.msg);
      }
    });
  }
  // 导出
  exporDaretList() {
    let lastMonthStart = moment(new Date(this.mydatepicker.startTime)).format("YYYY-MM-DD 00:00:00");
    let thisMonthEnd = moment(new Date(this.mydatepicker.endTime)).format("YYYY-MM-DD 23:59:59");
    window.open('/daoway/rest/orders/exportExcel/' + this.userId + "?startTime=" + lastMonthStart + "&endTime=" + thisMonthEnd, '_blank', '');
  }
  // 查询
  searchEvent(type:string) {
    this.p = 1;
    this.searchType = type;
    this.getorderArray();
  }
}
