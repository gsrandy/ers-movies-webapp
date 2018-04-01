import { NgModule } from "@angular/core";
import { AppTopbarComponent } from "./app-topbar/app-topbar.component";
import { AppSidebarComponent } from "./app-sidebar/app-sidebar.component";
import { CommonModule } from "@angular/common";
import { LAYOUT_ROUTING } from "./layout-routes";
import { LayoutsComponent } from "./layouts.component";
import { AppHeaderComponent } from './app-header/app-header.component';

@NgModule({
    declarations : [LayoutsComponent,
                    AppSidebarComponent,
                    AppTopbarComponent,
                    AppHeaderComponent],
    imports : [
      CommonModule,
      LAYOUT_ROUTING
    ]
})
export class LayoutsModule{

}
