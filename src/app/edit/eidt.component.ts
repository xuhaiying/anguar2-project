import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/Rx';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  private userId: string;
 
  constructor(private _parent: MainComponent, private http: Http,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.userId = this._parent.userId;
  }

  changePW (value:any){
    let body = $.param ({
      userId: this.userId,
      old_pwd: value.old_pwd,
      new_pwd: value.new_pwd
  });
    let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' });
    let options = new RequestOptions({ headers: headers});
    this.http.post("/daoway/rest/user/modify_password/" + this.userId, body, options)
      .toPromise()
      .then(response => {
        const res = response.json();
        if (res.status === 'ok'){
          this.toastr.success('修改密码成功');
        } else {
          this.toastr.error(res.msg);
        }
      })
  }
}
