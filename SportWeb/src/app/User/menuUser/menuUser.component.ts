import { Component, OnInit } from '@angular/core';
import { HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menuUser',
  templateUrl: './menuUser.component.html',
  styleUrls: ['./menuUser.component.css']
})
export class MenuUserComponent implements OnInit {

  readonly AdminArray: readonly { text: string, url: string, type: number ,queryParams:string}[] = [
    { "text": "Strona główna", "url": "./", "type": 0 ,"queryParams":null},
    { "text": "Nowy artykuł", "url": "./editForm", "type": 1,"queryParams":null },
    { "text": "Artykuły", "url": "./editTable", "type": 1 ,"queryParams":"2"},
    { "text": "Media", "url": "/", "type": 1 ,"queryParams":null},
    { "text": "Użytkownicy", "url": "./editTable", "type": 2 ,"queryParams":"1"},
    { "text": "Kategoria", "url": "./editTable", "type": 2 ,"queryParams": "3"}
  ];
  constructor() {
   }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let header = document.querySelector('header');
    let nav = document.querySelector('nav');
    let footer = <HTMLElement>document.querySelector('.searcherAndSocialMedia') || <HTMLElement>document.querySelector('.searcherAndSocialMediaStandard');
    let height = header.offsetHeight + nav.offsetHeight + footer.offsetHeight;
    if (height > event.target.innerHeight || event.target.innerWidth <= 768) {
      header.parentElement.classList.remove("stickyItem");
      header.parentElement.classList.add("standardItem");
      footer.classList.remove('searcherAndSocialMedia');
      footer.classList.add('searcherAndSocialMediaStandard');
    }
    else {
      header.parentElement.classList.add("stickyItem");
      header.parentElement.classList.remove("standardItem");
      footer.classList.add('searcherAndSocialMedia');
      footer.classList.remove('searcherAndSocialMediaStandard');
    }

    if (event.target.innerWidth <= 768) {
      let menu = document.body.querySelector('.NavSide');
      let footerbottom = document.body.querySelector('footer');
      let container = document.body.querySelector('.container-fluid');
      menu.appendChild(nav);
      container.appendChild(footerbottom);
    }
    else {
      let menu = document.body.querySelector('.stickyItem');
      let footerbottom = document.body.querySelector('footer');
      if (menu !== null) {
        if (menu.querySelector('nav') == null) {
          nav.style.visibility='visible';
          menu.insertBefore(nav,footer);
        }
        if(footer.querySelector('footer')==null){
          footer.appendChild(footerbottom);
        }
      }
    }

  }
}
