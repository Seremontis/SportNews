import { Component, OnInit } from '@angular/core';
import { HostListener,ElementRef,ViewChild } from '@angular/core';

@Component({
  selector: 'app-menuUser',
  templateUrl: './menuUser.component.html',
  styleUrls: ['./menuUser.component.css']
})
export class MenuUserComponent implements OnInit {
  AdminArray: { text: string, url: string, type:number }[] = [
    { "text": "Strona główna", "url": "/MainPage","type": 0},
    { "text": "Nowy artykuł", "url": "/editForm","type": 1},
    { "text": "Artykuły", "url": "/tableForms","type": 1},
    { "text": "Media", "url": "/","type": 1},
    { "text": "Użytkownicy", "url": "/userTableForms","type": 2},
    { "text": "Kategoria", "url": "/editCategory","type": 2}
  ];
  constructor() { }

  ngOnInit() {
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let header=document.querySelector('header');
    let nav=document.querySelector('nav');
    let footer=<HTMLElement>document.querySelector('.searcherAndSocialMedia')||<HTMLElement>document.querySelector('.searcherAndSocialMediaStandard');
    let height=header.offsetHeight+nav.offsetHeight+footer.offsetHeight;
    if(height>event.target.innerHeight){
      header.parentElement.classList.remove("stickyItem");
      header.parentElement.classList.add("standardItem");
      footer.classList.remove('searcherAndSocialMedia');
      footer.classList.add('searcherAndSocialMediaStandard');
    }
    else{
      header.parentElement.classList.add("stickyItem");
      header.parentElement.classList.remove("standardItem");
      footer.classList.add('searcherAndSocialMedia');
      footer.classList.remove('searcherAndSocialMediaStandard');
    }
  }
}
