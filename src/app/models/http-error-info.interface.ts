import { HttpErrorResponse } from "@angular/common/http";

export interface HttpErrorInfo{
    error : HttpErrorResponse;
    redirectToLoginOn401 : boolean;
    message : string;
}
