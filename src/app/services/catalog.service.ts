import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Movie } from "../models/movie.model";
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/map';
import { MovieCategory } from "../models/movie-category.model";

@Injectable()
export class CatalogService{

    constructor(private httpClient : HttpClient){}

    public getMovies() : Observable<Movie[]>{
        const serverUrl : string = environment.serverUrl + '/api/catalog/movies';
        return this.httpClient.
                    get(serverUrl).
                    map((response)=> this.convertMoviesResult(response));
    }

    public getCategories() : Observable<MovieCategory[]>{
      const serverUrl : string = environment.serverUrl + '/api/catalog/movies_categories';
      return this.httpClient.
                  get(serverUrl).
                  map((response)=> this.convertCategoriesResult(response));
    }

    private convertMoviesResult(data) : Movie[]{
       const movies : Movie[] = [];
        data.forEach((m)=>{
            const movie : Movie = new Movie();
            movie.id = m.id;
            movie.categoryId = m.category;
            movie.categoryName = m.category_name;
            movie.status = m.status;
            movie.title = m.title;
            movie.description = m.description;
            movie.imageUrl = m.image_url;
            movie.rating = m.rating;
            movie.director = m.director;
            movie.stars = m.stars;
            movie.duration = m.duration;
            movie.rentAmt = m.rent_amt;
            movie.releaseDate = m.release_date;
            movie.trailerUrl = m.trailer_url;
            movies.push(movie);
        });

       return movies;
    }

    private convertCategoriesResult(data) : MovieCategory[]{
         const categories : MovieCategory[] = [];
         data.forEach((mc)=>{
             const category : MovieCategory = new MovieCategory();
             category.id = mc.id;
             category.name = mc.name;
             categories.push(category);
         });
         return categories;
    }
}
