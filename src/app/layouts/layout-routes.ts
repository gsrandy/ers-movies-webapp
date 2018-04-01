import { Route, RouterModule } from "@angular/router";
import { LayoutsComponent } from "./layouts.component";

const LAYOUT_ROUTES : Route[] = [
     {path : '' , component : LayoutsComponent, children: [
          { path: "", redirectTo: "movies-list", pathMatch: "full" },
          {path : 'movies-list', loadChildren : 'app/pages/movies-list/movies-list.module#MoviesListModule'},
          {path : 'rent-list', loadChildren : 'app/pages/rents-list/rents-list.module#RentsListModule'}
     ]},
     {path : 'authentication/login',
      loadChildren : 'app/pages/authentication/login/login.module#LoginModule'
    }
];

export const LAYOUT_ROUTING = RouterModule.forChild(LAYOUT_ROUTES);
