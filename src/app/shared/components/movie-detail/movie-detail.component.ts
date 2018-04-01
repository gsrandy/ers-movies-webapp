import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  @Input('movie') movie : Movie;
  @Output('onClickRentMovie') onClickRentMovie : EventEmitter<Movie> =
            new EventEmitter<Movie>();

  constructor() { }

  ngOnInit() {
  }

  onRentMovie(){
    console.log('Click Rent Movie: ' , this.movie);
    this.onClickRentMovie.emit(this.movie);
  }

  getStatusDescription(status : string){
     let statusDesc : string = '';
     switch(status){
         case 'A':
            statusDesc = 'Available'
         break
         case 'R':
            statusDesc = 'Rented'
         break
     }
     return statusDesc
  }


}
