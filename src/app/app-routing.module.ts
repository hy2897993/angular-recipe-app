import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthGuardService } from './auth_guard.service'
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { AboutPageComponent } from './about-page/about-page.component';


const routes: Routes = [
  { path:'', component:MainPageComponent },
  { path:'angular-recipe-app/user/:username', component:MainPageComponent },
  { path:'angular-recipe-app/register', component:RegisterPageComponent },
  { path:'angular-recipe-app/login', component:LoginPageComponent },
  { path:'angular-recipe-app/account', component:AccountPageComponent ,canActivate: [AuthGuardService]},
  { path:'angular-recipe-app/about', component:AboutPageComponent },
  // { path:'',redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
