import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barVisitor',
  templateUrl: './barVisitor.component.html',
  styleUrls: ['./barVisitor.component.css']
})
export class BarVisitorComponent implements OnInit {

  model=true;
  constructor() { }

  ngOnInit() {
  }
  showHideMenu() {
    if(this.model){
      document.querySelector('nav').style.visibility='visible';
      let navTop=<HTMLElement>document.querySelector('.NavTop');
      navTop.classList.add('NavSelected');
      navTop.style.position='fixed';
    }
    else{
      document.querySelector('nav').style.visibility='hidden';
      let navTop=<HTMLElement>document.querySelector('.NavTop');
      navTop.classList.remove('NavSelected');
      navTop.style.position='relative';
    }
    this.model=!this.model;
  }
}
