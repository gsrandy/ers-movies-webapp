import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

const AUTH_LOGIN_ROUTES : Route[] = [
   {path : '', component : LoginComponent}
];

@NgModule({
    declarations : [LoginComponent],
    imports:[
      CommonModule,
      ReactiveFormsModule,
      RouterModule.forChild(AUTH_LOGIN_ROUTES)
    ]
})
export class LoginModule{

}
