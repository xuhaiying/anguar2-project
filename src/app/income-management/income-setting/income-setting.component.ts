import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/Rx';
import { MainComponent } from '../../main/main.component';

@Component({
  selector: 'app-income-setting',
  templateUrl: './income-setting.component.html',
  styleUrls: ['./income-setting.component.css']
})
export class IncomeSettingComponent implements OnInit {
  userId: string;
  accountData = {
    alipayName: "",
    alipayAccount: "",
    bankProvince: "",
    bankCity: "",
    bankKaihu: "",
    bankBranch: "",
    bankAccount: "",
    bankName: ""
  };
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
      this.accountData = res.data;
    } else {
      this.toastr.error(res.msg);
    }
  });
}
}
