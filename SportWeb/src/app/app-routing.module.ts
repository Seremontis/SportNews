import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorLayoutComponent } from './Layout/visitor-layout/visitor-layout.component';
import { UserLayoutComponent } from './Layout/user-layout/user-layout.component';
import { VisitorHomeComponent } from './Visitor/visitor-home/visitor-home.component';
import { CategoriesComponent } from './Visitor/Categories/Categories.component'
import { ArticleComponent } from './Visitor/article/article.component'
import { LoginComponent } from './Login/Login.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import {ArticleFormComponent } from './User/articleForm/articleForm.component'
import {EditTableComponent} from './User/editTable/editTable.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: VisitorLayoutComponent,
    children: [
      {
        path: 'home',
        component: VisitorHomeComponent
      },
      {
        path: 'categories/:id',
        component: CategoriesComponent
      },

      {
        path: 'article/:id',
        component: ArticleComponent
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}