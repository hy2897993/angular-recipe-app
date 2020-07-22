import { Component } from '@angular/core';
import { environment } from './../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'recipe-app';
  private apiUrl = "https://recipe-sql.herokuapp.com/api"
  // 'https://cors-anywhere.herokuapp.com/http://www.yingrecipedatabaseapi.xyz/api'
}

