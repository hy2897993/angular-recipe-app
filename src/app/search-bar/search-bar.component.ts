import { Component, OnInit, Input, Output, EventEmitter, ViewChild ,ViewEncapsulation, SimpleChange} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faBookmark} from '@fortawesome/free-solid-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  encapsulation: ViewEncapsulation.None,
styles:[`

  .picsum-img-wrapper{
    text-align: center;
  }
  .image{
    display: inline-block;
  }

  // .carousel-inner{
  //   display: inline-block;
  // }

  .carousel-item
  {
    display:block;
    flex:none;
    opacity:0;
    transition: opacity 2s;
  }
  .carousel-item.active
  {
    display:block;
    flex:none;
    opacity:1;
    transition: opacity 2s;

  }
  .carousel-control-next-icon {

    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 24 24'%3e%3cpath d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z'/%3e%3c/svg%3e");

}  .carousel-control-prev-icon {

    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 24 24'%3e%3cpath d='M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z'/%3e%3c/svg%3e");

}
`]
})
export class SearchBarComponent implements OnInit {

  @Input() status;
  @Input() loadNumber;
  @Input() clickRecipe;

  // @Input() item: SearchItem = new SearchItem('');
  @Output() DataHits=new EventEmitter();
  @Output() showToggle = new EventEmitter();
  @Output() resetLoadNumber = new EventEmitter();

  // @Input() data: DataHit = new DataHit({});
  // @Output() data: EventEmitter<SearchItem> = new EventEmitter<SearchItem>();
  starIcon;
  item: string;
  APP_ID :string= "d562e4ab";
  APP_KEY :string= "3b387819773efc619f9567115e35a949" ;
  query: string='';
  dataHits: any;

  value = 'Clear me';

  searchWords: string ='';




  private router: any;

   constructor(router: Router) {


    this.router = router;
  }

  ngOnInit() {
    this.starIcon = fasStar
  }
  test(){
    alert('clicked')
  }
  onSubmit(form: NgForm) {
    this.resetLoadNumber.emit({number:9})
    console.log(form)
    this.query = form.value.searchWords;
    this.getRecipes();

    // this.searchWords='';

    // this.formSubmit.emit(form.value);
  }

  getRecipes = async() =>{
    const response = await fetch(`https://api.edamam.com/search?q=${this.query}&app_id=${this.APP_ID}&app_key=${this.APP_KEY}&from=0&to=${this.loadNumber}`)
    const data = await response.json()
    this.dataHits = data.hits;
    this.sendOut(data.hits)
  }
  sendOut(dataHits){
    this.DataHits.emit(dataHits)
  }


  showMarked(){
    this.showToggle.emit({msg:'mark'})
  }




  //image change
  // images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images = ['https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
            'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
            'https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2252&q=80',
            'https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
            'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
            'https://images.unsplash.com/photo-1504113888839-1c8eb50233d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
            'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60'
          ]

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  ngOnChanges(loadNumber:SimpleChange) {
    console.log('load number change')
    console.log(this.clickRecipe)
    if(this.query&&this.clickRecipe){
      console.log('get recipe')
    this.getRecipes()
  }
  }


}

