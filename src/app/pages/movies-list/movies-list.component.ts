import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { Movie } from '../../models/movie.model';
import { ApplicationService } from '../../services/application.service';
import { MovieCategory } from '../../models/movie-category.model';
import { Observable, Subscription } from 'rxjs/Rx';
import { MovieRentService } from '../../services/movie-rent.service';
import { MovieRentInfo } from '../../models/movie-rent-info.interface';
import { ToastrService } from 'ngx-toastr';

declare var $ : any;

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit, OnDestroy {

  selectedViewType : string = "thumbs";

  movies : Movie[];
  filteredMovies : Movie[];
  selectedMovie : Movie;
  categories : MovieCategory[];
  selectedCategory : number = -1;
  defaultMoviesPerPageValue : number = 25;
  selectedMoviesPerPageValue : number = this.defaultMoviesPerPageValue;

  @ViewChild('txtSearchValue') txtSearch : ElementRef;
  txtSearch$ : Subscription;
  searchValue : string = '';

  rentMovieModalId : string = "rentMovieModal";

  constructor(private applicationService : ApplicationService,
              private movieRentService : MovieRentService,
              private catalogService : CatalogService,
              private toastrService : ToastrService) { }

  ngOnInit() {
     const movies$ = this.catalogService.getMovies();
     const categories$ = this.catalogService.getCategories();
     Observable.
         forkJoin([movies$, categories$]).
         subscribe(([movies, categories])=>{
              this.movies = movies;
              this.filteredMovies = this.movies.slice();
              this.categories = categories;
         }, (error)=>{
          this.applicationService.handleHttpError({
             error : error,
             redirectToLoginOn401 : true,
             message : 'Some Error!'
          });
     });

     this.txtSearch$ = Observable.
          fromEvent(this.txtSearch.nativeElement , 'keyup').
          debounceTime(200).
          pluck('target').
          pluck('value').
          subscribe((value : string)=>{
              this.searchValue = value;
              this.filterMovies();
          });
  }

  ngOnDestroy(){
      this.txtSearch$.unsubscribe();
  }

  onSelectView(viewType : string){
      this.selectedViewType = viewType;
  }

  onSelectMoviesPerPage(moviesPerPage : number){
    this.selectedMoviesPerPageValue = moviesPerPage;
    this.filterMovies();
  }

  onSelectCategory(categoryId : number){
      console.log('Category Id: ', categoryId);
      this.selectedCategory = +categoryId;
      this.filterMovies();
  }

  filterMovies(){
      let result;
      if(this.selectedCategory === -1){
        result = this.movies.slice(0 , this.selectedMoviesPerPageValue);
      }else{
        result = this.movies.
            filter((m)=> m.categoryId === this.selectedCategory);
        if(result){
          result = result.
                slice(0, this.selectedMoviesPerPageValue);
        }else{
          this.filteredMovies = [];
        }
      }
      if(result){
        this.filteredMovies = result.filter((m)=> (this.searchValue === '' || m.title.toLocaleLowerCase().
                                    indexOf(this.searchValue.toLocaleLowerCase()) > -1));
      }else{
        this.filteredMovies = [];
      }
  }

  onRentMovie(movie : Movie){
    console.log('On Rent Movie: ', movie);
    this.selectedMovie = movie;
     $('#' + this.rentMovieModalId).modal('show');
  }

  onSaveRent(movieRentInfo : MovieRentInfo){
      this.movieRentService.
           createMovieRent(movieRentInfo).
           subscribe((response)=>{
              this.toastrService.success('Movie Rented Successfully!');
              $('#' + this.rentMovieModalId).modal('hide');
           },(error)=>{
              this.applicationService.handleHttpError(
                {
                  error : error,
                  redirectToLoginOn401 : true,
                  message : 'Some Error!'
               }
              );
           });
  }

  onCloseModal(){
     this.selectedMovie = null;
  }


}
