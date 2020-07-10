import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: "./register-page.component.html"
})
export class RegisterPageComponent {
  credentials: TokenPayload = {
    id: 0,
    username: "",
    password: ""
  };
  sucess:boolean = false;

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        // this.router.navigateByUrl("/user/"+this.credentials.username);
        this.sucess = true;
        setTimeout(()=>this.router.navigateByUrl("register/login"), 2000) ;
      },
      err => {
        console.error(err);
      }
    );
  }
}