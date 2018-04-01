import { NgModule } from "@angular/core";
import { RentsListComponent } from "./rents-list.component";
import { CommonModule } from "@angular/common";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Route, RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";

const RENT_LIST_ROUTE : Route[] = [
  {path : '', component : RentsListComponent}
];

@NgModule({
    declarations : [RentsListComponent],
    imports : [
       CommonModule,
       NgxDatatableModule,
       SharedModule,
       RouterModule.forChild(RENT_LIST_ROUTE)
    ]
})
export class RentsListModule{

}
