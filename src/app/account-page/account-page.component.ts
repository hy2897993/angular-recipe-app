import { Component } from '@angular/core'
import { AuthenticationService, UserDetails } from '../auth.service'


@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html'
})
export class AccountPageComponent {
  details: UserDetails



  constructor(private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.details = this.auth.getUserDetails()

    console.log(this.details)


  }
}
