import {Component, OnInit, Input, Output, SimpleChanges} from '@angular/core';
import { SearchItem } from '../models/search-model';
import { DomSanitizer } from '@angular/platform-browser';
import {AuthenticationService} from "../auth.service";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe";
import {Router} from "@angular/router";
import set = Reflect.set;
import {delay, first, tap} from "rxjs/operators";
import { environment } from 'src/environments/environment';


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
  displayIndex;
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
    // await this.getMarkedRecipes()
    const loop = new Promise((resolve, reject)=>{
      if (this.markedRecipes.length > 0) {
          let i = 0
          let j = 0
          let arrImg = []
          let arrLabel = []

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
    console.log('icons update')

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
    this.displayIndex = event.index;
    console.log(this.displayIndex)
  }


  getLoadNumber(event){
    console.log('load more!')
    console.log(event);
    this.loadNumber=this.loadNumber+12
    console.log(this.loadNumber);
    this.getIcons()

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
    var x=0
    var i
    for(x;x<this.recievedData.length;x++){
      if(this.recievedData[x].recipe.label == event.recipe.label && this.recievedData[x].recipe.image == event.recipe.image){
        console.log(x)
        i = x
      }
    }
    
    if (event.bool){
      this.recievedData[i].bookmarked = true
      console.log(this.recievedData[i])
      this.markedRecipes.push({label:event.recipe.label,image:event.recipe.image})
      this.addlikedRecipe(
        JSON.stringify({label:event.recipe.label,image:event.recipe.image})
        , 'true'
        , this.username
      )

      // setTimeout(()=>this.getRecipes(),10)
    }else {
      this.recievedData[i].bookmarked = false
      // console.log(event.recipe)
      const index = this.markedRecipes.indexOf({label:event.recipe.label,image:event.recipe.image})
      this.markedRecipes.splice(index, 1)
      this.addlikedRecipe(
        JSON.stringify({label:event.recipe.label,image:event.recipe.image})
        , 'false'
        , this.username
      )
      
    }
    
  }

  deleteRecipe(event){
    // console.log(event)

    var x=0
    var i
    for(x;x<this.recievedData.length;x++){
      if(this.recievedData[x].recipe.label == event.recipe.label && this.recievedData[x].recipe.image == event.recipe.image){
        console.log(x)
        this.recievedData[x].bookmarked = false
        i = true
      }
    }

    
    this.markedRecipes.splice(event.i, 1)
    this.addlikedRecipe(
      JSON.stringify({label:event.recipe.label,image:event.recipe.image})
      , 'false'
      , this.username
    )
  }


  addlikedRecipe (recipe: string, marked:string, username: string): void {
    const newRecipe: Recipe = {recipe, marked, username} as Recipe
    this.recipeService.addRecipe(newRecipe).subscribe(() => {
      console.log('add to server')
    })
  }

  getStatusChange(event){
    console.log(event.status)
    this.status = event.status
  }
}
