import {Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http,RequestOptions,Headers} from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user_name: string = "";
  password: string = "";
  message: string = "";
  constructor(
    private router: Router,
    private http: Http,
    private routeInfo: ActivatedRoute,
    private cookie: CookieService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef){
    this.toastr.setRootViewContainerRef(vcr);
    this.routeInfo.queryParams.subscribe((params: Params) => {
      this.user_name = params["user_name"];
      this.password = params["password"];
      if (this.user_name && this.password){
        this.login();
      }
    });
  }
  login():void {
    if (!this.user_name || !this.password)return;
    let body = $.param ({
      "user_name": this.user_name,
      "password": this.password
    });
    let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' });
    let options = new RequestOptions({ headers: headers});
    this.http.post("/daoway/rest/users/login", body, options)
      .toPromise()
      .then(response => {
        const res = response.json();
        if (res.status === 'ok'){
          const data = res.data;
          this.cookie.put("userId",data.userId);
          this.cookie.put("userName",data.nick);
          this.getAndSaveServiceId(data.userId);
        } else {
          this.message = res.msg;
        }
      })
  }
  getAndSaveServiceId(userId) {
    const url = '/daoway/rest/services/provided_by/' + userId;
    this.http.get(url)
    .map(res => res.json())
    .subscribe((res) => {
      if (res.status === 'ok') {
          const data = res.data;
          if (data.length > 0) {
            this.cookie.put("serviceId",data[0].id);
            this.router.navigate(['/order']);
          } else {
            this.toastr.error("您尚未在到位开店，请先开店");
          }
        } else {
          this.toastr.error(res.msg);
        }
      })
  }
  closeAlert (){
    this.message = "";
  }
  ngOnInit() {
  }

}
