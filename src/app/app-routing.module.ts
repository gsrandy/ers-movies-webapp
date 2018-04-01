import { Route, RouterModule } from "@angular/router";

const APP_ROUTES : Route[] = [
    { path : '', loadChildren : './layouts/layouts.module#LayoutsModule'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
