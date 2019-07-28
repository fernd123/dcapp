import { DateComponent } from './date/date.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDateComponent } from './customer-date/customer-date.component';
import { CustomerComponent } from './customer/customer.component';
import { ProfileCustomerComponent } from './customer/profile-customer/profile-customer.component';

const routes: Routes = [
  { path: 'dates', component: DateComponent, canActivate: [AuthGuardService] },
  { path: 'customers', component: CustomerComponent, canActivate: [AuthGuardService] },
  { path: 'customerDate', component: CustomerDateComponent, canActivate: [AuthGuardService] },
  { path: 'customerProfile/:id', component: ProfileCustomerComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent, pathMatch: 'full', canActivate: [AuthGuardService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
