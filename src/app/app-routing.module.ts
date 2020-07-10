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
  { path:'user/:username', component:MainPageComponent },
  { path:'register', component:RegisterPageComponent },
  { path:'login', component:LoginPageComponent },
  { path:'account', component:AccountPageComponent ,canActivate: [AuthGuardService]},
  { path:'about', component:AboutPageComponent },
  // { path:'',redirectTo:'/', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
