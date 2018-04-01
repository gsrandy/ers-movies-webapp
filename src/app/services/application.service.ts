import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { HttpErrorInfo } from "../models/http-error-info.interface";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ApplicationService{

      constructor(private router : Router, private toastrService : ToastrService){}

      public handleHttpError(errorInfo : HttpErrorInfo){
           console.log('Error Info: ', errorInfo);
           if(errorInfo.error.status === 401){
              this.toastrService.error('Token Expired...');
              if(errorInfo.redirectToLoginOn401){
                  console.log('Redirect to Login...');
                  this.router.navigate(['authentication/login']);
              }
           }else if(errorInfo.error.status === 400){
            this.toastrService.error('Invalid Form Data!');
           }else if(errorInfo.error.status === 500){
              this.toastrService.error('Server Error!');
           }else{
              this.toastrService.error(errorInfo.message);
           }
      }
}
