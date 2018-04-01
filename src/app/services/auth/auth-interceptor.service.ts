import {Injectable, Injector} from "@angular/core";
import {HttpErrorResponse, HttpInterceptor} from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { HttpEvent } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  public intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>{
    console.log('Intercepting request:', req);
    const clonedRequest = this.authenticateReq(req);
    return next.
           handle(clonedRequest)
           .catch((error: any) => {
              if (error instanceof HttpErrorResponse) {
                //TODO: Refresh token Logic
                // if (error.status === 401 && error.url.toString().indexOf('/api/login') < 0) {

                // }
                return Observable.throw(error);
              } else {
                localStorage.removeItem('authToken');
                return Observable.throw(error);
              }
            });
    }

    private authenticateReq(req : HttpRequest<any>){
      if(req.url.toString().indexOf("/api/login") < 0){
        const authToken = localStorage.getItem('authToken');
        return req.clone({headers : req.headers.set('Authorization','JWT ' + authToken)});
      }else{
        return req;
      }
    }

}
