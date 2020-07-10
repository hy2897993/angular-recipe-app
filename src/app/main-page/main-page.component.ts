import {Component, OnInit, Input, Output, SimpleChanges} from '@angular/core';
import { SearchItem } from '../models/search-model';
import { DomSanitizer } from '@angular/platform-browser';
import {AuthenticationService} from "../auth.service";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe";
import {Router} from "@angular/router";
import set = Reflect.set;
import {delay, first, tap} from "rxjs/operators";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  providers: [RecipeService]
})


export class MainPageComponent implements OnInit {



  constructor(private router: Router,private sanitizer: DomSanitizer, private recipeService: RecipeService, public auth: AuthenticationService) {}

  eventData: any;
  searchItems: SearchItem[] = new Array<SearchItem>()
  recievedData;
  displayItem;
  toggle:string='';
  status: number = 0;
  statusCopy : number = 0;
  loadNumber: number =18;
  clickRecipe: boolean = true;
  username: string ='';
  markedRecipesFromServer: Recipe[];
  markedRecipes:any;

  ngOnInit() {
    console.log('ngOnInit')
    this.getUser().then(()=>this.getMarkedRecipes())
      // .then(()=>this.getMarkedRecipes())
  }

  // ngOnChanges(clickRecipe: SimpleChanges) {
  //   console.log(clickRecipe)
  // }


  async getUser(){
    let v = await this.auth.getUserDetails()
        // let v = this.auth.getUserDetails()
    this.username = v.identity.username
    console.log(this.username)
    return Promise.resolve(v.identity.username);

  }

getMarkedRecipesFromServer() {
    return this.recipeService.getRecipes(this.username).pipe(
        tap(markedRecipesFromServer => {
            this.markedRecipesFromServer = markedRecipesFromServer
          // console.log(this.markedRecipesFromServer)
        }),
        first()
    ).toPromise()

}

  async getMarkedRecipes() {
    await this.getMarkedRecipesFromServer()
       let i = 0
       this.markedRecipes=[]
       for (i; i < this.markedRecipesFromServer.length; i++) {
         this.markedRecipes.push(JSON.parse(this.markedRecipesFromServer[i][1]))
       }
     // console.log(this.markedRecipes)
  }



  // getIcon=async ()=>{
  //
  //       if (this.markedRecipes) {
  //         let i = 0
  //         let j = 0
  //         let arr = []
  //
  //         for (i; i < this.markedRecipes.length; i++) {
  //           arr.push(this.markedRecipes[i].label)
  //         }
  //
  //         for (j; j < this.recievedData.length; j++) {
  //           if (arr.includes(this.recievedData[j].recipe.label)) {
  //             this.recievedData[j].bookmarked = true
  //           } else {
  //             this.recievedData[j].bookmarked = false
  //           }
  //         }
  //         return this.recievedData
  //       }
  // }


  getEvent(event){
      this.eventData = event
      // console.log(this.eventData)
      this.status = 1;
      console.log('status' + this.status)
    this.getIcons()
  }

  getIcons = async ()=>{
    await this.getMarkedRecipes()
    const loop = new Promise((resolve, reject)=>{
      if (this.markedRecipes.length > 0) {
          let i = 0
          let j = 0
          let arrLabel = []
          let arrImg = []

          for (i; i < this.markedRecipes.length; i++) {
            arrLabel.push(this.markedRecipes[i].label)
            arrImg.push(this.markedRecipes[i].image)
          }
          // console.log(arrLabel)
          // console.log(arrImg)

          for (j; j < this.eventData.length; j++) {
            var temRecievedData = this.eventData
            if (arrLabel.includes(this.eventData[j].recipe.label)&&arrImg.includes(this.eventData[j].recipe.image)) {
              temRecievedData[j].bookmarked = true
            } else {
              temRecievedData[j].bookmarked = false
            }
          }
      }else{
        console.log('markedRecipes undefined ')
        var temRecievedData = this.eventData
      }
      resolve(temRecievedData)

    }).then((temRecievedData)=>{
      this.recievedData = temRecievedData
      // console.log(this.recievedData)
    })

  }


  getToggle(event){
    console.log(event.msg)
    if(this.toggle == event.msg&&this.statusCopy == 3){
      this.statusCopy = 0
    }else{
      this.toggle = event.msg;
      this.statusCopy = 3
      console.log(this.statusCopy)
      // this.getRecipes()
    }
  }
  closeMark(event){
    console.log(event.msg)
    this.statusCopy = 0
  }





  getDisplayIndexToMain(event){
    console.log(event);
    this.clickRecipe = false
    console.log(this.clickRecipe)
    this.displayItem = this.recievedData[event.index].recipe;
  }


  getLoadNumber(event){
    console.log('load more!')
    console.log(event);
    this.loadNumber=this.loadNumber+12
    console.log(this.loadNumber);
  }


  getLoadNumberReset(event){
    console.log('reset load number')
    console.log(event);
    this.loadNumber=18;
  }


  addItem(newItem: SearchItem){
    this.searchItems.push(newItem)
  }


  getSentStatusToMain(event){
    this.status=event.number;
  }


  getSendAddedLikedToMain(event){
    console.log('main get bookmark change')
    if (event.bool){
      this.addlikedRecipe(
        JSON.stringify({label:event.recipe.label,image:event.recipe.image})
        , 'true'
        , this.username
      )

      // setTimeout(()=>this.getRecipes(),10)
    }else {
      // console.log(event.recipe)
      this.addlikedRecipe(
        JSON.stringify({label:event.recipe.label,image:event.recipe.image})
        , 'false'
        , this.username
      )
    }
    // this.getIcons()

  }

  deleteRecipe(event){
    // console.log(event.recipe)
    this.addlikedRecipe(
      JSON.stringify({label:event.recipe.label,image:event.recipe.image})
      , 'false'
      , this.username
    )
    // this.getIcons()
  }


  addlikedRecipe (recipe: string, marked:string, username: string): void {
    const newRecipe: Recipe = {recipe, marked, username} as Recipe
    this.recipeService.addRecipe(newRecipe).subscribe(() => {
      console.log('add to server')
      this.getIcons()
    })
  }

  getStatusChange(event){
    console.log(event.status)
    this.status = event.status
  }
}
