import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { faPlusCircle as fasFaPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import {faTimes} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input() displayItem;
  @Output() statusChange = new EventEmitter()
  deleteIcon = faTimes;

  label : string ='';
  calories: number = null;
  cautions: Array<string> = [];
  dietLabels: Array<string> = [];
  digest: Array<object> = [];​
  healthLabels: Array<string> = [];
  ​​​image: string = '';
  ingredientLines: Array<string> = [];
  ingredients: Array<object> = [];
  ​​​shareAs: string = '';
  source: string = '';
  totalDaily: Object = {};
  totalNutrients: Object = {};
  totalTime: number = null;
  totalWeight: number = null;
  uri: string = '';
  url: string = '';
  showUrl: boolean = false;
  controllerSrc;
  // sanitizer: DomSanitizer;

  iconName = fasFaPlusCircle;

  i: number = 0
  
  constructor(private sanitizer: DomSanitizer){
    this.url?this.controllerSrc.sanitizer.bypassSecurityTrustResourceUrl(this.url):null
  }


  ngOnChanges(){
    
    console.log('changes')
    this.label = this.displayItem.label
    this.calories = Math.round(this.displayItem.calories/4.184) 
    this.cautions = this.displayItem.cautions
    this.dietLabels = this.displayItem.dietLabels
    this.healthLabels = this.displayItem.healthLabels
    this.​​​image = this.displayItem.​​​image
    this.ingredientLines = this.displayItem.ingredientLines
    this.ingredients = this.displayItem.ingredients
    
    this.​​​shareAs = this.displayItem.​​​shareAs
    this.source = this.displayItem.source
    this.totalDaily = this.displayItem.totalDaily
    this.totalNutrients = this.displayItem.totalNutrients
    this.totalTime = this.displayItem.totalTime ==0? 30:this.displayItem.totalTime
    this.totalWeight = Math.round(this.displayItem.totalWeight) 
    this.uri = this.displayItem.uri
    this.url = this.displayItem.url


  }

  getSafeUrl(url) {
    return 
  }

  readItem(){
    console.log('clicked')
    console.log(this.displayItem.label)
    this.label = this.displayItem.label
  }

  ngOnInit(): void {
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

  close(){
    console.log('close')
    this.statusChange.emit({status : 1})
  }
}
