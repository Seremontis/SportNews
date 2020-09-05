import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLayoutComponent } from './Layout/user-layout/user-layout.component';
import { VisitorLayoutComponent } from './Layout/visitor-layout/visitor-layout.component';
import { UserHomeComponent } from './Home/user-home/user-home.component';
import { VisitorHomeComponent } from './Home/visitor-home/visitor-home.component';
import {MenuComponent} from './Layout/menu/menu.component';
import {ScheduleAndScoreComponent} from './Layout/scheduleAndScore/scheduleAndScore.component';
import {BarUserComponent} from './Layout/barUser/barUser.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLayoutComponent,
    VisitorLayoutComponent,
    UserHomeComponent,
    VisitorHomeComponent,
    MenuComponent,
    ScheduleAndScoreComponent,
    BarUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
