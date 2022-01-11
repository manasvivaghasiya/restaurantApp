import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path: 'registration',component:RegistrationComponent},
  {path: 'forgot-pass', component:ForgotPassComponent},
  {path: 'welcome', component:WelcomeComponent},
  {path: 'dashboard', component:DashboardComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
