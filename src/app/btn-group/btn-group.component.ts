import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-btn-group',
  templateUrl: './btn-group.component.html',
  styleUrls: ['./btn-group.component.css']
})
export class BtnGroupComponent implements OnInit {
  @Input()
  btnArray: Array<Object>;
  @Input()
  active: String;
  
  constructor() { }

  ngOnInit() {
  }

}
