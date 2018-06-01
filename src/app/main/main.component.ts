import {Component, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public userId: string;
  public serviceId: string;
  public userName: string;
  constructor(private router: Router,private cookie: CookieService) {
   }

  ngOnInit() {
    this.userId = this.cookie.get("userId");
    this.serviceId = this.cookie.get("serviceId");
    this.userName = this.cookie.get("userName");
    if (!this.userId || !this.serviceId){
      this.router.navigate(['/login']);
    } else {
      if (this.router.url === '/'){
        this.router.navigate(['/order']);
      }
    }
  }
}
