import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.gaurd';
import { CrudComponent } from './crud/crud.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { LoginComponent } from './login/login.component';
import { ProductCrudComponent } from './product-crud/product-crud.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path: 'registration',component:RegistrationComponent},
  {path: 'forgotpass', component:ForgotPassComponent},
  {path: 'welcome', component:WelcomeComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path:'crud',component:CrudComponent},
  {path:'product-crud',component:ProductCrudComponent},
  {path: 'app',canActivate:[AuthGuard],
   children:[
     {
       path:'dashboard',
       component: DashboardComponent,
     },
   ],     
}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
