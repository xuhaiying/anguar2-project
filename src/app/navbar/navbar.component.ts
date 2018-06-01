import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string;
  constructor(private router: Router,private cookie: CookieService) { }

  ngOnInit() {
    this.userName = this.cookie.get("userName");
  }
  logout() {
    this.cookie.remove("userId");
    this.router.navigate(['/login']);
  }
}
