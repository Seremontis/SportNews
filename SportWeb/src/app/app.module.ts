import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLayoutComponent } from './Layout/user-layout/user-layout.component';
import { VisitorLayoutComponent } from './Layout/visitor-layout/visitor-layout.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { VisitorHomeComponent } from './Visitor/visitor-home/visitor-home.component';
import {MenuComponent} from './Layout/menu/menu.component';
import {ScheduleAndScoreComponent} from './Visitor/scheduleAndScore/scheduleAndScore.component';
import {BarUserComponent} from './Visitor/barUser/barUser.component';
import { CategoriesComponent } from './Visitor/Categories/Categories.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLayoutComponent,
    VisitorLayoutComponent,
    UserHomeComponent,
    VisitorHomeComponent,
    MenuComponent,
    ScheduleAndScoreComponent,
    BarUserComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
