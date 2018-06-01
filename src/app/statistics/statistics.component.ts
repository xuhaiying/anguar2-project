import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import * as moment from 'moment';
import 'rxjs/Rx';
import { DatepickerPopupComponent } from "../datepicker-popup/datepicker-popup.component";
import { MainComponent } from '../main/main.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  @ViewChild('mydatepicker')
  myd: DatepickerPopupComponent;
  userId: string;
  serviceId: string;
  itemModel: Array < Object > ;
  total = {
    userCountSum: 0,
    userOrderCountSum: 0,
    orderCountSum: 0,
    paidCountSum: 0,
    orderConversionRateSum: 0,
    returnCountSum: 0,
    returnBillSum: 0,
    couponBillSum: 0,
    clinchBillSum: 0,
    commissionSum: 0
  };
  constructor(private http: Http, private _parent: MainComponent, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  chartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        id: 'first-y-axis',
        ticks: {
          callback: function (value, index, values) {
            return value + '元'
          }
        },
        scaleLabel: {
          display: true,
          labelString: '成交金额'
        }
      }, {
        id: 'second-y-axis',
        position: 'right',
        gridLines: {
          display: false
        },
        ticks: {
          callback: function (value, index, values) {
            return value + '单';
          }
        },
        scaleLabel: {
          display: true,
          labelString: '付款订单量'
        }
      }]
    }
  };

  chartData = [{
    label: '成交金额（在左侧）',
    data: [],
    yAxisID: 'first-y-axis'
  }, {
    label: '付款订单量（在右侧）',
    data: [],
    fill: false,
    type: 'line',
    yAxisID: 'second-y-axis'
  }];

  chartLabels = [];
  ngOnInit() {
    this.userId = this._parent.userId;
    this.serviceId = this._parent.serviceId;
    this.getServiceStatistics();
  }
  formartMyDate(time): string {
    return time.year + '-' + time.month + '-' + time.day;
  }
  getServiceStatistics() {
    let mydatepicker = this.myd;
    let lastMonthStart = moment(new Date(mydatepicker.startTime)).format("YYYY-MM-DD");
    let thisMonthEnd = moment(new Date(mydatepicker.endTime)).format("YYYY-MM-DD");
    this.http.get('/daoway/rest/service/' + this.serviceId + '/stat/daily/channel?start=' + lastMonthStart + '&end=' + thisMonthEnd)
      .map(res => res.json())
      .subscribe((res) => {
        if (res.status === 'ok') {
          let datas = res.data;
          this.itemModel = datas;
          let label = [],
            barDatas = [],
            lineDatas = [];
          let [userCountSum, userOrderCountSum, orderCountSum, paidCountSum, orderConversionRateSum,
            returnCountSum, returnBillSum, couponBillSum, clinchBillSum, commissionSum
          ] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          datas.forEach(item => {
            label.unshift(item.day);
            barDatas.unshift(item.clinchBill);
            lineDatas.unshift(item.paidCount);
            userCountSum += item.userCount;
            userOrderCountSum += item.userOrderCount;
            orderCountSum += item.orderCount;
            paidCountSum += item.paidCount;
            orderConversionRateSum += item.orderConversionRate;
            returnCountSum += item.returnCount;
            returnBillSum += item.returnBill;
            couponBillSum += item.couponBill;
            clinchBillSum += item.clinchBill;
            commissionSum += item.commission;
          });
          this.chartData[0].data = barDatas;
          this.chartData[1].data = lineDatas;
          this.chartLabels = label;
          this.total = {
            userCountSum: userCountSum,
            userOrderCountSum: userOrderCountSum,
            orderCountSum: orderCountSum,
            paidCountSum: paidCountSum,
            orderConversionRateSum: orderConversionRateSum,
            returnCountSum: returnCountSum,
            returnBillSum: returnBillSum,
            couponBillSum: couponBillSum,
            clinchBillSum: clinchBillSum,
            commissionSum: commissionSum
          }

        } else {
          this.toastr.error(res.msg)
        }
      });
  }
}
