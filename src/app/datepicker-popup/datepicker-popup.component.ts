import { Component } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { zhCnLocale } from 'ngx-bootstrap/locale';
import {defineLocale} from "ngx-bootstrap";
defineLocale('zh-ch', zhCnLocale);
@Component({
  selector: 'app-datepicker-popup',
  templateUrl: './datepicker-popup.component.html'
})
export class DatepickerPopupComponent {
  public startTime: Date;
  public endTime: Date;
  constructor(private _localeService: BsLocaleService) {
    this._localeService.use('zh-ch');
    let today = new Date();
    today.setMonth(today.getMonth()-1);
    this.startTime =  new Date(today);
    this.endTime = new Date();
  }
}
