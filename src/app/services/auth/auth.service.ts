import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginInfo } from "../../models/login-info.interface";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService{

    constructor(private httpClient : HttpClient){}

    public loginWithEmailAndPassword(loginInfo : LoginInfo) : Observable<any>{
        const serverUrl :  string = environment.serverUrl + '/api/login';
        return this.httpClient.
                    post(serverUrl , loginInfo).
                    do((response)=> {
                         localStorage.setItem('username' , loginInfo.username);
                         localStorage.setItem('authToken', response['token']);
                    });
    }

    public getLoggedUsername() : string{
       return localStorage.getItem('username');
    }

    public clearLocalStorage(){
      localStorage.clear();
    }

}
