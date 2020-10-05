import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-barVisitor',
  templateUrl: './barVisitor.component.html',
  styleUrls: ['./barVisitor.component.css']
})
export class BarVisitorComponent implements OnInit {

  model = true;
  constructor() { }

  ngOnInit() {
  }
  showHideMenu() {
    if (this.model) {
      document.querySelector('nav').style.visibility = 'visible';
      let navTop = <HTMLElement>document.querySelector('.NavTop');
      navTop.classList.add('NavSelected');
      navTop.style.position = 'fixed';
    }
    else {
      document.querySelector('nav').style.visibility = 'hidden';
      let navTop = <HTMLElement>document.querySelector('.NavTop');
      navTop.classList.remove('NavSelected');
      navTop.style.position = 'relative';
    }
    this.model = !this.model;
  }


  blackModeActivation() {
    let tag = <HTMLElement>document.querySelector('.contentPage');
    this.prependClass(tag, "darkbackground");
  }


  standardThemeActive() {
    let tag = <HTMLElement>document.querySelector('.contentPage');
    tag.classList.remove('darkbackground');
  }

  prependClass(sel: HTMLElement, strClass: string) {
    let clone = <HTMLElement>sel.cloneNode(true);
    let list = clone.classList;
    sel.className = '';
    sel.classList.add(strClass);
    for (let i = 0; i < list.length; i++) {
      sel.classList.add(list[i]);
    }
  }
}