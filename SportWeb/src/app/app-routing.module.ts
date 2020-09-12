import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorLayoutComponent} from './Layout/visitor-layout/visitor-layout.component';
import { UserLayoutComponent} from './Layout/user-layout/user-layout.component';
import { VisitorHomeComponent } from './Visitor/visitor-home/visitor-home.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { CategoriesComponent} from './Visitor/Categories/Categories.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'',
    component:VisitorLayoutComponent,
    children:[
      { 
        path: 'home',
        component: VisitorHomeComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      }
    ]
  },
  {
    path:'user',
    component:UserLayoutComponent,
    children:[
      { path: 'home',
        component: UserHomeComponent
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