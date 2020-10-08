import { Component, OnInit } from '@angular/core';
import { DarkMode } from 'src/service/DarkMode';
import { FontSizeManipulation } from 'src/service/FontSizeManipulation';
declare var $: any;

@Component({
  selector: 'app-barVisitor',
  templateUrl: './barVisitor.component.html',
  styleUrls: ['./barVisitor.component.css']
})
export class BarVisitorComponent implements OnInit {

  elementToChangeModeWithBorder: string[] = ['.contentPage', '.mainBar', '.contentSchedule', '.NavSide'];
  //customATageToChangeMdoe:string[]=['a','.mainBar'];
  model = true;
  constructor(private mode: DarkMode, private fontChange: FontSizeManipulation) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (localStorage.getItem('darkMode'))
      this.mode.blackModeActivation();
  }
  blackModeActivation() {
    this.mode.blackModeActivation();
  }


  standardThemeActive() {
    this.mode.standardThemeActive();
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

  fontNormalChange() {
    this.fontChange.normalFontchange();
  }

  fontLargeChange() {
    this.fontChange.largeFontchange();
  }

  veryLargeChange() {
    this.fontChange.veryLargeFontchange()
  }
}