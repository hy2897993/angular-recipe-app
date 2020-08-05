
import {Component, OnInit, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http'
import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";
import {AuthenticationService} from "../auth.service";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
  providers: [RecipeService]
})
export class RecipeCardComponent implements OnInit {


  starIcon;
  // tempMark;

  @Input() recipe;
  @Input() marked;
  @Input() i;
  @Input() displayIndex;
  @Output() sendIndex = new EventEmitter();
  @Output() sendAddedLiked = new EventEmitter();
  @Output() sendStatus = new EventEmitter();
  borderStyle: string;


  constructor(private recipeService: RecipeService, private http: HttpClient, private router: Router, public auth: AuthenticationService) {}


  ngOnInit(): void {
    // this.tempMark = this.marked
    this.getIcon()
  }

  ngOnChanges() {
    this.getIcon()

  }

  getIcon(){
    if(this.marked) {
      this.starIcon = fasStar
    }else{
      this.starIcon = farStar
    }
    if(this.displayIndex == this.i){
      this.borderStyle = 'black 2px solid'
    }else{
      this.borderStyle = ' white 5px solid'
    }
  }

  chooseDishes(i:number){
    this.sendIndex.emit({index:i})
    console.log(i)
    this.sendStatus.emit({number:2})
    // this.borderStyle = "black 2px solid"
    

  }

  bookMarkRecipe(){
    if(!this.marked){
      console.log('mark!')
      // this.marked = true
      this.sendAddedLiked.emit({i: true, recipe: this.recipe});
      // this.starIcon = fasStar
    }else{
      console.log('unmark!')
      // this.marked = false
      // this.starIcon = farStar
      this.sendAddedLiked.emit({i: false, recipe: this.recipe});
    }
  }

}
