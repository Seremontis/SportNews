import { Component, OnInit } from '@angular/core';
import { ApiVisitorService } from 'src/service/operation/ApiVisitorService';
import { HostListener } from '@angular/core';
import { FontSizeManipulation } from 'src/service/operation/FontSizeManipulation';

@Component({
  selector: 'app-visitor-layout',
  templateUrl: './visitor-layout.component.html',
  styleUrls: ['./visitor-layout.component.css']
})
export class VisitorLayoutComponent implements OnInit {
  isShow: boolean; //button parameter

  constructor(private service: ApiVisitorService, private fontMode:FontSizeManipulation) {
    this.CheckIsOnlineServer();
    if(localStorage.getItem('FontMode')){
      if(localStorage.getItem("FontMode")=='1')
        this.fontMode.largeFontchange();
      if(localStorage.getItem("FontMode")=='2')
        this.fontMode.veryLargeFontchange();
    }
  }

  ngOnInit(): void {
  }

  CheckIsOnlineServer() {
    this.service.CheckIsOnlineServer().subscribe(
      (response) =>{},
      (error) => {
        //console.error('Request failed with error');
        if(error.status==0 || error.status>499)
          alert("Brak połaczenia z serwerem");
      });
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
