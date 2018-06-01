import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from "@angular/http";
import { CookieModule } from 'ngx-cookie';
import { FormsModule } from "@angular/forms";
// import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AlertModule,BsDatepickerModule,PaginationModule,ModalModule } from 'ngx-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

import * as $ from 'jquery';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { MainComponent } from './main/main.component';
import { OrderComponent } from './order/order.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoginComponent } from './login/login.component';
import { OrderCardComponent } from './order/order-card/order-card.component';
import { DatepickerPopupComponent } from "./datepicker-popup/datepicker-popup.component";
import { IncomeManagementComponent } from './income-management/income-management.component';
import { EditComponent } from './edit/eidt.component';
import { IncomeDetailComponent } from './income-management/income-detail/income-detail.component';
import { WithdrawDepositComponent } from './income-management/withdraw-deposit/withdraw-deposit.component';
import { IncomeSettingComponent } from './income-management/income-setting/income-setting.component';
import { BtnGroupComponent } from './btn-group/btn-group.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SiderbarComponent,
    MainComponent,
    OrderComponent,
    StatisticsComponent,
    LoginComponent,
    OrderCardComponent,
    DatepickerPopupComponent,
    IncomeManagementComponent,
    EditComponent,
    IncomeDetailComponent,
    WithdrawDepositComponent,
    IncomeSettingComponent,
    BtnGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    CookieModule.forRoot(),
    // NgxPaginationModule,
    ChartsModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    BrowserAnimationsModule, 
    ToastModule.forRoot(),
    ModalModule.forRoot(),
    NgSelectModule
  ],
  providers: [{
    provide: LocationStrategy, useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
