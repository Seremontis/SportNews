import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorLayoutComponent} from './Layout/visitor-layout/visitor-layout.component';
import { UserLayoutComponent} from './Layout/user-layout/user-layout.component';
import { VisitorHomeComponent } from './Home/visitor-home/visitor-home.component';
import { UserHomeComponent } from './Home/user-home/user-home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'visitor',
    pathMatch: 'full'
  },
  {
    path:'visitor',
    component:VisitorLayoutComponent,
    children:[
      { path: 'home',
        component: VisitorHomeComponent
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