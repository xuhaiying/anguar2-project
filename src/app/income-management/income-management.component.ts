import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-income-management',
  templateUrl: './income-management.component.html',
  providers: [Location],
  styleUrls: ['./income-management.component.css']
})
export class IncomeManagementComponent implements OnInit {
  
  path: string;

  constructor(location: Location, router:Router) { 
    this.path = location.path();
    router.events.filter((event) => event instanceof NavigationStart)
      .subscribe((event:NavigationStart) => {
      this.path = event.url
    });
   }

  ngOnInit() {
  }

}
