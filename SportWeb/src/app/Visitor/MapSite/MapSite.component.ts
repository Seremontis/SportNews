import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Loading } from 'src/assets/Loading';
import { AccessData } from 'src/service/AccessData';
import { DarkMode } from 'src/service/DarkMode';
import { WCategory } from 'src/service/model/WCategory';

@Component({
  selector: 'app-MapSite',
  templateUrl: './MapSite.component.html',
  styleUrls: ['./MapSite.component.css']
})
export class MapSiteComponent implements OnInit {
  @ViewChildren('li') elements: QueryList<any>;
  MainCategoryList: WCategory[];
  private readonly loading: Loading = new Loading();
  constructor(private accessData: AccessData, private mode: DarkMode) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this.MainCategoryList)
      this.loading.Loading(document.querySelector('.visitor'), 'text-primary');
    if (localStorage.getItem('darkMode')) {
      this.elements.changes.subscribe(li => {
        li.forEach(elm => this.mode.DarkModeMenuLink())
      })
    }
  }

  LoadMainCategoryList(): boolean {
    let result = this.accessData.readCategoryList();
    if (result) {
      this.MainCategoryList = [];
      result.forEach(elem => {
        if (elem.aboveCategory) {
        }
        else {
          this.MainCategoryList.push(elem);
        }
      })
      if (this.MainCategoryList.length > 0)
        return true
      else
        return false
    }
    return false
  }

  GetSubMenu(id: number) {
    let result = this.accessData.readCategoryList();
    let list: WCategory[] = [];
    if (result) {
      result.forEach(elem => {
        if (elem.aboveCategory == id)
          list.push(elem);
      })
    }
    return list;
  }
}
