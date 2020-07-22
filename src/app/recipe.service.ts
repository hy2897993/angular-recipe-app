import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Recipe } from './recipe'

@Injectable()
export class RecipeService {

    constructor(private http: HttpClient) { }
    private apiUrl = "https://recipe-sql.herokuapp.com/api"
    // 'https://cors-anywhere.herokuapp.com/http://www.yingrecipedatabaseapi.xyz/api'
    addRecipe (recipe: Recipe): Observable<Recipe> {
        const url = `${this.apiUrl}/user/${recipe.username}`
        console.log(recipe)
      // if(recipe.marked == 'true') {
        return this.http.post<Recipe>(url, recipe)
      // }else{
      //   ,this.http.delete<Recipe>(url)
      // }
    }

    getRecipes(username: unknown): Observable<Recipe[]> {
        const url = `${this.apiUrl}/user/${username}`
        return this.http.get<Recipe[]>(url)
    }
}
