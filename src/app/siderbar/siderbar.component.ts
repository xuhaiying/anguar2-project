import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  providers: [Location],
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent implements OnInit {

  path: string;

  constructor(private location: Location) { 
    this.path = location.path();
   }

  ngOnInit() {
  }

}
