import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLayoutComponent } from './Layout/user-layout/user-layout.component';
import { VisitorLayoutComponent } from './Layout/visitor-layout/visitor-layout.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { VisitorHomeComponent } from './Visitor/visitor-home/visitor-home.component';
import {MenuComponent} from './Visitor/menu/menu.component';
import {ScheduleAndScoreComponent} from './Visitor/scheduleAndScore/scheduleAndScore.component';
import {BarVisitorComponent} from './Visitor/barVisitor/barVisitor.component';
import { CategoriesComponent } from './Visitor/Categories/Categories.component';
import { LoginComponent } from './Login/Login.component';
import {BarUserComponent} from './User/barUser/barUser.component';
import {MenuUserComponent} from './User/menuUser/menuUser.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ArticleFormComponent } from './User/articleForm/articleForm.component';
import {CommonModule, formatCurrency,DatePipe} from '@angular/common';
import { EditTableComponent } from './User/editTable/editTable.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalCategoryEditComponent} from 'src/app/User/ModalCategoryEdit/ModalCategoryEdit.component';
import { ArticleComponent } from './Visitor/article/article.component';
import {TruncatePipe} from '../service/operation/TruncatePipe'
import { SearchResultComponent } from './Visitor/SearchResult/SearchResult.component';
import { MapSiteComponent } from './Visitor/MapSite/MapSite.component';
import {ModalViewComponent} from './User/ModalView/ModalView.component'
import { UserEditFormComponent } from './User/userEditForm/userEditForm.component';

@NgModule({
  declarations: [	
    AppComponent,
    UserLayoutComponent,
    VisitorLayoutComponent,
    UserHomeComponent,
    VisitorHomeComponent,
    MenuComponent,
    ScheduleAndScoreComponent,
    BarVisitorComponent,
    BarVisitorComponent,
    CategoriesComponent,
      LoginComponent,
      BarUserComponent,
      MenuUserComponent,
      ArticleComponent,
      EditTableComponent,
      ModalCategoryEditComponent,
      ArticleFormComponent,
      SearchResultComponent,
      TruncatePipe,      
      MapSiteComponent,
      ModalViewComponent,
      UserEditFormComponent
   ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule, 
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule, NgbAlertModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[ModalCategoryEditComponent]
})
export class AppModule { }
