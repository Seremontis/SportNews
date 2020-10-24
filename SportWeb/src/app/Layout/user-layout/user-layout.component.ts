import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import {Session} from 'src/service/Session'

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {
  isShow: boolean;
  private route: string;

  constructor(private location:Location,private router: Router,private session:Session) {
    router.events.subscribe(val => {
      if (location.path() != "" && this.route!=location.path()) {
        this.route = location.path();
        if(!session.CheckSession()){
          alert('Brak uprawnień do modułu, proszę się zalogować')
          window.location.href='/login';      
        }
      }
    });
   }


  ngOnInit(): void {
  }
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;

    if (scrollPosition >= 150) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
