import { NgModule } from "@angular/core";
import { MovieCardComponent } from "./components/movie-card/movie-card.component";
import { CommonModule } from "@angular/common";
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieRentModalComponent } from './components/movie-rent-modal/movie-rent-modal.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations : [
       MovieCardComponent,
       FilterPanelComponent,
       MovieDetailComponent,
       MovieRentModalComponent
    ],
    imports : [
        CommonModule,
        ReactiveFormsModule
    ],
    exports : [
      MovieCardComponent,
      MovieDetailComponent,
      MovieRentModalComponent,
      FilterPanelComponent
    ]
})
export class SharedModule{

}
