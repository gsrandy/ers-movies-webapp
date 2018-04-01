import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { MovieRentService } from '../../services/movie-rent.service';
import { MovieRent } from '../../models/movie-rent.model';
import { ApplicationService } from '../../services/application.service';
import { Movie } from '../../models/movie.model';
import { MovieCategory } from '../../models/movie-category.model';
import { CatalogService } from '../../services/catalog.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { MovieRentInfo } from '../../models/movie-rent-info.interface';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import * as moment from 'moment';

declare var $ : any;

@Component({
  selector: 'app-rents-list',
  templateUrl: './rents-list.component.html',
  styleUrls: ['./rents-list.component.css']
})
export class RentsListComponent implements OnInit, OnDestroy {

  moviesRents : MovieRent[];
  filteredMovieRents : MovieRent[];
  movies : Movie[];
  categories : MovieCategory[];

  rentMovieModalId : string = "rentMovieModal";

  columns = [
    { prop: 'id' },
    { prop: 'customerName' },
    { prop: 'movieTitle' },
    { prop: 'rentStartDate' },
    { prop: 'rentEndDate' },
    { prop : 'statusDesc'},
    { prop : 'rentAmt'},
    { prop : 'penaltyAmt'},
    { prop : 'totalAmt'},
  ];

  @ViewChild('txtSearchValue') txtSearch : ElementRef;
  txtSearch$ : Subscription;
  searchValue : string = '';

  constructor(private applicationService: ApplicationService,
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
              this.categories = categories;
         }, (error)=>{
          this.applicationService.handleHttpError({
             error : error,
             redirectToLoginOn401 : true,
             message : 'Some Error!'
          });
     });

     this.movieRentService.
          getMoviesRents().
          subscribe((moviesRents : MovieRent[])=>{
             this.moviesRents = moviesRents;
             this.filteredMovieRents = this.moviesRents.slice();
          },(error)=>{
            this.applicationService.handleHttpError(
              {
                error : error,
                redirectToLoginOn401 : true,
                message : 'Some Error!'
             }
            );
          });

    this.txtSearch$ = Observable.
          fromEvent(this.txtSearch.nativeElement , 'keyup').
          debounceTime(200).
          pluck('target').
          pluck('value').
          subscribe((value : string)=>{
              this.searchValue = value;
              if(this.searchValue !== ''){
                  this.filteredMovieRents = this.moviesRents.
                      filter((mr)=> mr.customerName.toLocaleLowerCase().indexOf(this.searchValue.toLocaleLowerCase()) > -1)
              }else{
                  this.filteredMovieRents = this.moviesRents.slice();
              }
          });
  }

  ngOnDestroy(){
     this.txtSearch$.unsubscribe();
  }

  createNewMovieRent(){
     $('#' + this.rentMovieModalId).modal('show');
  }

  onSaveRent(movieRentInfo : MovieRentInfo){
    this.movieRentService.
           createMovieRent(movieRentInfo).
           subscribe((response)=>{
              const movieRent : MovieRent = this.movieRentService.convertMovieRent(response);
              this.moviesRents.push(movieRent);
              this.filteredMovieRents.push(movieRent);
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

  onReturnMovie(movieRent : MovieRent){
    const rentEndDate = moment(movieRent.rentEndDate, "YYYY-MM-DD");
    const currentDate = moment();
    if(currentDate > rentEndDate){
      swal({
        title: 'Important Info',
        text: 'This Movie Rent is in delay status, aditional charges will be apply!',
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, Proceed',
        cancelButtonText: 'No, Cancel'
      }).then((success) => {
           this.returnMovieRent(movieRent);
        },
        function (dismiss) {
          // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
          if (dismiss === 'cancel') {
          }
        });
    }else{
        this.returnMovieRent(movieRent);
    }
  }

  returnMovieRent(movieRent : MovieRent){
    this.movieRentService.
          returnMovieRent(movieRent.id).
          subscribe((response)=>{
              const index : number = this.moviesRents.findIndex((mr)=> mr.id === response.id);
              this.moviesRents[index] = response;
              const fIndex : number = this.filteredMovieRents.findIndex((mr)=> mr.id === response.id);
              console.log('FiNDEX: ' , fIndex);
              if(fIndex > -1){
                this.filteredMovieRents[fIndex] = response;
              }
              this.toastrService.success('Movie Returned Successfully!');
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

}
