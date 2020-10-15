import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DarkMode } from 'src/service/DarkMode';
import { FontSizeManipulation } from 'src/service/FontSizeManipulation';
declare var $: any;

@Component({
  selector: 'app-barVisitor',
  templateUrl: './barVisitor.component.html',
  styleUrls: ['./barVisitor.component.css']
})
export class BarVisitorComponent implements OnInit {

  @ViewChildren('mainbar') span: QueryList<any>;
  elementToChangeModeWithBorder: string[] = ['.contentPage', '.mainBar', '.contentSchedule', '.NavSide'];
  //customATageToChangeMdoe:string[]=['a','.mainBar'];
  model = true;
  constructor(private mode: DarkMode, private fontChange: FontSizeManipulation, private font: FontSizeManipulation) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (localStorage.getItem('darkMode'))
      this.mode.blackModeActivation();

    if (localStorage.getItem('FontMode'))
      this.font.mainbarResize();

  }
  blackModeActivation() {
    this.mode.blackModeActivation();
  }


  standardThemeActive() {
    this.mode.standardThemeActive();
  }


  showHideMenu() {
    var bar=<HTMLElement>document.querySelector('app-barvisitor');
    let visitorNav=<HTMLElement>document.querySelector('.visitor');
    if (this.model) {
      visitorNav.style.visibility = 'visible';
      //visitorNav.style.overflow='auto';
      //document.body.style.overflow='hidden';
      bar.style.minHeight='100vh';
      visitorNav.style.minHeight='100%';
      visitorNav.style.height='auto';
    }
    else {
      (<HTMLElement>document.querySelector('.visitor')).style.visibility = 'hidden';
      //document.body.style.overflow='auto';
      visitorNav.style.height='0';
      visitorNav.style.minHeight='auto';
      bar.style.minHeight='auto';
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