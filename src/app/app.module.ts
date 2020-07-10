import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DisplayBoardComponent } from './display-board/display-board.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MarkedRecipeComponent } from './marked-recipe/marked-recipe.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';

import { AuthenticationService } from './auth.service';
import { AuthGuardService } from './auth_guard.service';

const routes: Routes = [
  { path: 'home', component: MainPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    AccountPageComponent,
    SearchBarComponent,
    DisplayBoardComponent,
    LoginPageComponent,
    MainPageComponent,
    MarkedRecipeComponent,
    NavBarComponent,
    RecipeCardComponent,
    RegisterPageComponent,
    RecipeDetailsComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserModule,
    MatGridListModule,
    MatIconModule,
    HttpClientModule,
    FontAwesomeModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [
    AppComponent,
    HttpClient,
    AuthenticationService, 
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
