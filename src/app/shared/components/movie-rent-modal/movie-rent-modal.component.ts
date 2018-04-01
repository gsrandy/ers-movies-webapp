import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Movie } from '../../../models/movie.model';
import { MovieCategory } from '../../../models/movie-category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieRentService } from '../../../services/movie-rent.service';
import { MovieRentInfo } from '../../../models/movie-rent-info.interface';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

declare var $ : any;

@Component({
  selector: 'app-movie-rent-modal',
  templateUrl: './movie-rent-modal.component.html',
  styleUrls: ['./movie-rent-modal.component.css']
})
export class MovieRentModalComponent implements OnInit, OnChanges, OnDestroy {

  @Output('onSaveMovieRent') onSaveMovieRent : EventEmitter<MovieRentInfo> = new EventEmitter<MovieRentInfo>();
  @Output('onCloseModal') onCloseModal : EventEmitter<any> = new EventEmitter<any>();
  @Input('modalId') modalId : string;
  @Input('categories') categories : MovieCategory[];
  @Input('movies') movies : Movie[];
  @Input('selectedMovie') selectedMovie : Movie;
  @ViewChild('txtStartDate') startDate : ElementRef;
  @ViewChild('txtEndDate') endDate : ElementRef;
  @ViewChild('txtPriceAmt') priceAmt : ElementRef;
  @ViewChild('txtPenaltyAmt') penaltyAmt : ElementRef;
  filteredMovies : Movie[];

  rentMovieForm :  FormGroup;
  txtQuantity$ : Subscription;

  constructor(private movieRentService : MovieRentService) { }

  ngOnInit() {
     this.rentMovieForm = new FormGroup({
         'customerName' : new FormControl(null , [Validators.required]),
         'daysQuantity' : new FormControl(null , [Validators.required, Validators.min(1)]),
         'movie' : new FormControl(-1, [Validators.required, this.notDefaultOptionValidator])
     });

     this.txtQuantity$ =this.rentMovieForm.controls['daysQuantity'].
          valueChanges.
          subscribe((value : number)=>{
               if(value){
                 this.updateMovieRentEndDate(value);
               }else{
                 this.endDate.nativeElement.value = '';
               }
          });

      this.startDate.nativeElement.value = moment().format('YYYY-MM-DD');
  }

  ngOnDestroy(){
     this.txtQuantity$.unsubscribe();
  }

  ngOnChanges(simpleChanges : SimpleChanges){
     const categories = simpleChanges['categories'];
     const movies = simpleChanges['movies'];
     const selectedMovie = simpleChanges['selectedMovie'];

     this.categories = categories ? categories.currentValue : this.categories;
     this.selectedMovie = selectedMovie ? selectedMovie.currentValue : this.selectedMovie;
     if(this.selectedMovie){
        this.rentMovieForm.controls['movie'].setValue(this.selectedMovie.id);
        this.rentMovieForm.controls['movie'].updateValueAndValidity();
        this.updateMoviePriceAndPenalty(this.selectedMovie.id);
     }
     this.movies = movies ? movies.currentValue : this.movies;
     this.filteredMovies = this.movies.length > 0 ? this.movies.slice() : [];
  }

  notDefaultOptionValidator(control : FormControl) : {[s: string] : boolean}{
      if(+control.value === -1){
         return {'isDefaultOption' : true};
      }
      return null;
  }

  onSelectCategory(categoryId : number){
      if(+categoryId === -1){
         this.filteredMovies = this.movies.slice();
      }else{
         this.filteredMovies = this.movies.filter((m)=> m.categoryId === +categoryId);
      }
  }

  closeModal(){
      $('#'+ this.modalId).modal('hide');
      this.resetForm();
      this.onCloseModal.emit();

  }

  resetForm(){
      this.rentMovieForm.reset({'movie' : -1});
      this.selectedMovie = null;
      this.startDate.nativeElement.value = '';
      this.endDate.nativeElement.value = '';
      this.priceAmt.nativeElement.value = '';
      this.penaltyAmt.nativeElement.value = '';
  }

  onSelectMovie(movieId : number){
      this.updateMoviePriceAndPenalty(movieId);
  }

  updateMoviePriceAndPenalty(movieId : number){
      const movie : Movie = this.movies.find((m)=> m.id === +movieId);
      if(movie){
        const penalty = movie.rentAmt * 0.05;
        this.priceAmt.nativeElement.value = movie.rentAmt;
        this.penaltyAmt.nativeElement.value = penalty;
      }else{
          this.priceAmt.nativeElement.value = '';
          this.penaltyAmt.nativeElement.value = '';
      }
  }

  updateMovieRentEndDate(daysQuantity : number){
      const todayDate = moment().add(daysQuantity,'d').format('YYYY-MM-DD');
      this.endDate.nativeElement.value = todayDate;
  }

  onSaveRent(){
      const movieRentInfo : MovieRentInfo = {
          customerName : this.rentMovieForm.value.customerName,
          movie : this.rentMovieForm.value.movie,
          rentTotalDays : this.rentMovieForm.value.daysQuantity
      };
      this.resetForm();
      this.onSaveMovieRent.emit(movieRentInfo);
  }

}
