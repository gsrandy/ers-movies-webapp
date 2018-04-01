import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

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
