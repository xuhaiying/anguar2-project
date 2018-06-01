import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/Rx';
import * as moment from 'moment';
import { MainComponent } from '../../main/main.component';
import { DatepickerPopupComponent } from '../../datepicker-popup/datepicker-popup.component';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrls: ['./income-detail.component.css']
})
export class IncomeDetailComponent implements OnInit {
  @ViewChild('mydatepicker')
  private mydatepicker: DatepickerPopupComponent;
  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  isModalShown: boolean = false;
  detail: Object;
  financial: Object;
  btnArray = [{
    name: '全部',
    value: 'all'
  },
  {
    name: '收入',
    value: 'in'
  },
  {
    name: '支出',
    value: 'out'
  }]; 
  p = 1; // 当前页号
  maxSize: number = 10; // 分页最多显示maxSize页，超出的部分显示...
  bigTotalItems: number; // 总数据数量
  size: number = 30; // 每次从服务器获取size条数据
  financialList: Array < Object > ;
  inMoney: Number = 0;
  outMoney: Number = 0;
  inNum: Number = 0;
  outNum: Number = 0;
  balance: Number = 0;
  userId: string;
  status: string;
  orderCardClassName: string;
  quantity: Number = 0;
  financialSearchTypeList = [
    {name: '全部',value: ''},
    {name: '按入账时间查询',value: 'account'},
    {name: '按下单时间查询',value: 'order'}
  ];
  financialType;
  financialTypeList = [
    {name: '全部',value:''},
    {name: '提现',value:'withdraw'},
    {name: '奖励',value:'bonus'},
    {name: '分成',value:'commission'},
    {name: '销售',value:'销售'},
    {name: '赔付',value:'compensate'}
  ];;
  typeseach;
  constructor(
    private http: Http, 
    private routeInfo: ActivatedRoute, 
    private _parent: MainComponent, 
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }
  ngOnInit() {
    this.userId = this._parent.userId;
    this.typeseach = this.financialTypeList[0];
    this.financialType = this.financialSearchTypeList[0];
    this.routeInfo.queryParams.subscribe((params: Params) => {
      this.status = params["status"]|| 'all';
      this.getBalanceDetail();
    });
  }

  pageChanged(event: any): void {
    this.p = event.page;
    this.getBalanceDetail();
  }

  getBalanceDetail() {
    let start = (this.p - 1) * this.size;
    const startTime = moment(new Date(this.mydatepicker.startTime)).format("YYYY-MM-DD 00:00:00");
    const endTime = moment(new Date(this.mydatepicker.endTime)).format("YYYY-MM-DD 23:59:59");
    let url = '/daoway/rest/account/' + this.userId + '/balance_detail?start=' + start + '&size=' + this.size + '&type=' + this.status + '&startTime=' +  startTime + '&endTime=' + endTime;
    if (this.typeseach.value){
      url += '&detailType=' + this.typeseach.value;
    } 
    if (this.financialType.value){
      url += '&dateType=' + this.financialType.value;
    }
    this.http.get( url ) .map(res => res.json()).subscribe((res) => {
        if (res.status === 'ok') {
          let data = res.data;
          this.financialList = data.details;
          this.inMoney = data.inMoney;
          this.outMoney = data.outMoney;
          this.inNum = data.inNum;
          this.outNum = data.outNum;
          if (data.details.length > 0) {
            this.balance = data.details[0].balance;
          }
        } else {
          this.toastr.error(res.msg);
        }
      });
  }
   // 导出
   exporDaretList() {
    let lastMonthStart = moment(new Date(this.mydatepicker.startTime)).format("YYYY-MM-DD 00:00:00");
    let thisMonthEnd = moment(new Date(this.mydatepicker.endTime)).format("YYYY-MM-DD 23:59:59");
    window.open('/daoway/rest/orders/balance_detail_excel/' + this.userId + "?startTime=" + lastMonthStart + "&endTime=" + thisMonthEnd + '&start=0&size=5000', '_blank', '');
  }

  openModalWithComponent(financial) {
    let url = '/daoway/rest/order/' + financial.orderId + '?userId=' + this.userId;
    this.http.get( url ) .map(res => res.json()).subscribe((res) => {
      if (res.status === 'ok') {
        var data = res.data;
        if (data.paid==-1){
          data.returnBill = financial.bill;
        } else {
          if (data.pay.returned){
            data.returnBill = data.partReturnOrder.bill;
          } 
        }
        const items = data.items;
        let quantity = 0;
        for (let i = 0,len = items.length; i<len; i++){
          quantity += items[i].quantity;
        }
        let statusId = data.statusId;
    if (statusId === '0'){
      this.orderCardClassName = 'order-card ordr-card-primary';
    } else if (statusId === '1') {
      this.orderCardClassName = 'order-card ordr-card-success';
    } else {
      this.orderCardClassName = 'order-card ordr-card-default';
    }
        this.detail = data;
        this.quantity = quantity;
        this.financial = financial;
        this.isModalShown = true;
      } else {
        this.toastr.error(res.msg.json);
      }
    });
  }

  hideModal(): void {
    this.autoShownModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }
}
