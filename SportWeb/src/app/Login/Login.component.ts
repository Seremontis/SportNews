import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/ApiService';
import { Session } from 'src/service/Session';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public session:Session) {
    if(session.CheckSession())
      window.location.href='/user';
   }

  ngOnInit() {
  }

  CheckUser(data){
    this.session.LogIn(data)
  }
    
}
