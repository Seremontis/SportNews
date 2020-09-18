import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorLayoutComponent } from './Layout/visitor-layout/visitor-layout.component';
import { UserLayoutComponent } from './Layout/user-layout/user-layout.component';
import { VisitorHomeComponent } from './Visitor/visitor-home/visitor-home.component';
import { CategoriesComponent } from './Visitor/Categories/Categories.component'
import { ArticleComponent } from './Visitor/article/article.component'
import { LoginComponent } from './Login/Login.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import {EditFormComponent} from './User/editForm/editForm.component'
import {EditTableComponent} from './User/editTable/editTable.component'

const routes: Routes = [
  {
    path: '',
    //redirectTo: 'home',
    redirectTo: 'user/editTable',
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
        path: 'categories',
        component: CategoriesComponent
      },

      {
        path: 'article',
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
        path:'editForm',
        component:EditFormComponent
      },
      {
        path:'editTable',
        component:EditTableComponent
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