import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Recipe } from "../recipe";
import { RecipeService } from "../recipe.service";
import {AuthenticationService} from "../auth.service";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {faCompress} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-marked-recipe',
  templateUrl: './marked-recipe.component.html',
  providers: [RecipeService]
})
export class MarkedRecipeComponent implements OnInit {

  @Input() markedRecipes: any;
  @Input() toggle='';
  @Output() sendDeleteRecipe = new EventEmitter()
  @Output() closeMark = new EventEmitter()
  deleteIcon = faTimes;
  compressIcon = faCompress;

  constructor(public auth: AuthenticationService, private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  deleteRecipe(index){
    this.sendDeleteRecipe.emit({recipe:this.markedRecipes[index]})
  }
  close(){
    this.closeMark.emit({msg:'unmark'})
  }


}

