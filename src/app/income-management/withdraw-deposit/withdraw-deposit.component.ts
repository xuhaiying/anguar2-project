import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/Rx';
import { MainComponent } from '../../main/main.component';

@Component({
  selector: 'app-withdraw-deposit',
  templateUrl: './withdraw-deposit.component.html',
  styleUrls: ['./withdraw-deposit.component.css']
})
export class WithdrawDepositComponent implements OnInit {

  userId: string;
  accountData = {
    totalPending: 0,
    totalBalance: 0,
    totalWithdraw: 0
  };
  accountType: string;
  bill: number;
  
  constructor(
    private http: Http,
    private _parent: MainComponent, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.userId = this._parent.userId;
    this.getAccount();
  }

  // 获取账户信息
  getAccount() {
    let url = '/daoway/rest/account/' + this.userId;
    this.http.get( url ).map( res => res.json()).subscribe((res) => {
      if (res.status === 'ok'){
        var data = res.data;
        this.accountData = data;
        if (data.alipayAccount){
          this.accountType = 'alipay';
        } else {
          if (data.bankAccount){
            this.accountType = 'bank';
          }
        }
      } else {
        this.toastr.error(res.msg);
      }
    });
  }
  // 提现
  withdrawSubmit() {
    if (this.bill<100){
      this.toastr.error('单笔提现金额最少为100元');
      return;
    }
    let body = $.param ({
      userId: this.userId,
      accountType: this.accountType,
      bill: this.bill
  });
    let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' });
    let options = new RequestOptions({ headers: headers});
    this.http.post("/daoway/rest/withdraw", body, options)
      .toPromise()
      .then(response => {
        const res = response.json();
        if (res.status === 'ok'){
          this.toastr.success('提现申请成功！');
        } else {
          this.toastr.error(res.msg);
        }
      })
  }
}
