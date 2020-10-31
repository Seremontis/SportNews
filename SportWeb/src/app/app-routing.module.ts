import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { VisitorLayoutComponent } from './Layout/visitor-layout/visitor-layout.component';
import { UserLayoutComponent } from './Layout/user-layout/user-layout.component';
import { VisitorHomeComponent } from './Visitor/visitor-home/visitor-home.component';
import { CategoriesComponent } from './Visitor/Categories/Categories.component'
import { ArticleComponent } from './Visitor/article/article.component'
import { LoginComponent } from './Login/Login.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import {ArticleFormComponent } from './User/articleForm/articleForm.component'
import {EditTableComponent} from './User/editTable/editTable.component';
import {SearchResultComponent} from './Visitor/SearchResult/SearchResult.component';
import {MapSiteComponent} from 'src/app/Visitor/MapSite/MapSite.component';
import {UserEditFormComponent} from './User/userEditForm/userEditForm.component'

const routes: Routes = [
  {
    path: '*',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: VisitorLayoutComponent,
    children: [
      {
        path: '',
        component: VisitorHomeComponent,
      },   
      {
        path: 'categories/:id',
        component: CategoriesComponent,      
      },  
      {
        path: 'search',
        component: SearchResultComponent
      } ,
      {
        path: 'article/:id',
        component: ArticleComponent,      
      },
      {
        path: 'mapsite',
        component: MapSiteComponent,
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    redirectTo: 'user/home',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      {
        path: 'home',
        component: UserHomeComponent
      },
      {
        path:'articleForm',
        component:ArticleFormComponent
      },
      {
        path:'articleForm/:id',
        component:ArticleFormComponent
      },
      {
        path:'editTable/articleForm/:id',
        component:ArticleFormComponent
      },
      {
        path:'editTable',
        component:EditTableComponent
      },
      {
        path:'editTable/:id',
        component:EditTableComponent
      },
      {
        path:'editTable/userForm',
        component:UserEditFormComponent
      },
      {
        path:'editTable/userForm/:id',
        component:UserEditFormComponent
      },
      {
        path:'test',
        component:UserEditFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}