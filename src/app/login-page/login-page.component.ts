import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-page',
    templateUrl: './login-page.component.html'
})

export class LoginPageComponent{


    credentials: TokenPayload = {
    id: 0,
    username: '',
    password: ''
  }

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/user/'+this.credentials.username)
      },
      err => {
        // var error = JSON.parse(err)
        console.error(err)
        // console.error(error)
        alert('The Login Information Is Not Found!')
      }
    )
  }
}

