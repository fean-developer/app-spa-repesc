import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { TradutorComponent } from './components/tradutor/tradutor.component';
import { AuthGuard } from './_helpers/auth.guard';
import { CustomersComponent } from './components/customers/customers.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'repescs', component: TradutorComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
