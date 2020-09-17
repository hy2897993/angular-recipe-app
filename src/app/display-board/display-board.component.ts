import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {faStar as fasStar} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-display-board',
  templateUrl: './display-board.component.html',
  styleUrls: ['./display-board.component.css']
})
export class DisplayBoardComponent implements OnInit {

  
  @Input() recievedData;
  @Input() displayIndex;
  n:number;
  m:number;
  @Input() status;
  @Input() statusCopy;
  @Output() sendIndexToMain = new EventEmitter()
  @Output() load = new EventEmitter()
  @Output() sendStatusToMain = new EventEmitter()
  @Output() sendAddedLikedToMain = new EventEmitter()



  constructor() { }

  ngOnInit() {
    console.log(this.recievedData)
  }

  ngOnChanges() {
      this.n = this.recievedData? Math.floor(this.recievedData.length/4)*4:0;
      this.m = this.recievedData? Math.floor(this.recievedData.length/5)*5:0;
  }

  // getIcon(){
  //   if(this.markedRecipes) {
  //     let i = 0
  //     let j = 0
  //     let arr = []
  //
  //     for (i; i < this.markedRecipes.length; i++) {
  //       arr.push(this.markedRecipes[i].title)
  //     }
  //
  //     for(j; j < this.recievedData.length; j++){
  //       if(arr.includes(this.recievedData[j].recipe.label)){
  //         this.recievedData[j].bookmarked = true
  //       }else{
  //         this.recievedData[j].bookmarked = false
  //       }
  //     }
  //   }
  // }

  getDisplayIndex(event){
    console.log(event);
    this.sendIndexToMain.emit({index:event.index})
  }
  getMarkedItem(event){
    console.log('1.'+event);
    console.log(event.item);
  }
  getLikedItem(event){
    console.log('2.'+event);
    console.log(event.item);
  }

  loadMore(){
    this.load.emit({number:20})
  }

  getSentStatus(event){
    this.sendStatusToMain.emit({number:event.number})
  }
  getAddedLiked(event){
    console.log('pass bookmark change to main')
    this.sendAddedLikedToMain.emit({bool:event.i, recipe: event.recipe})

  }

}

