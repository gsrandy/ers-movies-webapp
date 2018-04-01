import { NgModule } from "@angular/core";
import { MoviesListComponent } from "./movies-list.component";
import { Route, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";

const MOVIES_LIST_ROUTE : Route[] = [
    {path : '', component : MoviesListComponent}
];

@NgModule({
    declarations : [MoviesListComponent],
    imports : [
      CommonModule,
      SharedModule,
      RouterModule.forChild(MOVIES_LIST_ROUTE)
    ]
})
export class MoviesListModule{

}
