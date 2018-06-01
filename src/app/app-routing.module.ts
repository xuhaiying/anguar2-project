import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { OrderComponent } from './order/order.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoginComponent } from './login/login.component';
import { IncomeManagementComponent } from "./income-management/income-management.component";
import { IncomeDetailComponent } from "./income-management/income-detail/income-detail.component";
import { IncomeSettingComponent } from "./income-management/income-setting/income-setting.component";
import { WithdrawDepositComponent } from "./income-management/withdraw-deposit/withdraw-deposit.component";
import { EditComponent } from "./edit/eidt.component";

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'order', component: OrderComponent
      },
      {
        path: 'income', redirectTo: "income/detail"
      },
      {
        path: 'income', 
        component: IncomeManagementComponent,
        children: [
          {
            path: 'detail',
            component: IncomeDetailComponent
          },
          {
            path: 'setting',
            component: IncomeSettingComponent
          },
          {
            path: 'deposit',
            component: WithdrawDepositComponent
          }
        ]
      },
      {
        path: 'statistics', component: StatisticsComponent
      },
      {
        path: 'edit', component: EditComponent
      },
      {
        path: '**', redirectTo: "login"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
