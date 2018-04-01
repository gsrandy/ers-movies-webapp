import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MovieRentInfo } from "../models/movie-rent-info.interface";
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/Rx';
import { MovieRent } from "../models/movie-rent.model";

@Injectable()
export class MovieRentService{

    constructor(private httpClient : HttpClient){}

    public createMovieRent(movieRentInfo : MovieRentInfo) : Observable<any>{
         const serverUrl : string = environment.serverUrl + '/api/rent/movies_rent/';
         return this.httpClient.post(
              serverUrl,
              {customer_name : movieRentInfo.customerName,
               movie : movieRentInfo.movie,
               rent_total_days : movieRentInfo.rentTotalDays
              }
         )
    }

    public getMoviesRents(){
        const serverUrl : string = environment.serverUrl + '/api/rent/movies_rent';
        return this.httpClient.
                    get(serverUrl).
                    map((response)=> this.convertMoviesRents(response));
    }

    public convertMoviesRents(data) : MovieRent[]{
        const moviesRents : MovieRent[] = [];
        data.forEach((mr)=>{
            moviesRents.push(this.convertMovieRent(mr));
        });
        return moviesRents;
    }

    public convertMovieRent(mr) : MovieRent{
        const movieRent : MovieRent = new MovieRent();
        movieRent.id = mr.id;
        movieRent.movieId = mr.movie;
        movieRent.movieTitle = mr.movie_title;
        movieRent.customerName = mr.customer_name;
        movieRent.rentTotalDays = mr.rent_total_days;
        movieRent.rentStartDate = mr.rent_start_date;
        movieRent.rentEndDate = mr.rent_end_date;
        movieRent.rentBy = mr.rent_by;
        movieRent.rentAt = mr.rent_at;
        movieRent.rentAmt = mr.rent_amt;
        movieRent.penaltyAmt = mr.penalty_amt;
        movieRent.totalAmt = mr.total_amt;
        movieRent.status = mr.status;
        movieRent.statusDesc = mr.status_desc;
        movieRent.returnedAt = mr.returned_at;
        movieRent.returnedBy = mr.returned_by;
        return movieRent;
    }
}
