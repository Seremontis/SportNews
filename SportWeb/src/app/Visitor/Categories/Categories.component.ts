import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouteReuseStrategy } from '@angular/router';
import { HostListener } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { WListArticle } from 'src/service/model/WListArticle';
import { ApiVisitorService } from 'src/service/operation/ApiVisitorService';
import { DefaultImage } from 'src/assets/defaultImage';
import { AccessData } from 'src/service/operation/AccessData';
import { Loading } from 'src/service/operation/Loading';
import { DarkMode } from 'src/service/operation/DarkMode';
import { FontSizeManipulation } from 'src/service/operation/FontSizeManipulation';
import { Location } from '@angular/common';
import { WCategory } from 'src/service/model/WCategory';

declare var $: any;

@Component({
  selector: 'app-Categories',
  templateUrl: './Categories.component.html',
  styleUrls: ['./Categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @ViewChildren('div') elementDiv: QueryList<any>;
  @ViewChildren('li') elementLi: QueryList<any>;
  @ViewChildren('span') span: QueryList<any>;
  @ViewChildren('figure') elements: QueryList<any>;
  queryParam;
  id = null;
  isShow: boolean; //button parameter
  isEndList: boolean = true; //no more article
  ArticleList: WListArticle[];
  private imageDef: DefaultImage = new DefaultImage();
  private readonly loading: Loading = new Loading();
  startElement = 6;
  page = 1;
  SubCategoryList: WCategory[];
  flagSubCat = false;
  beforeId: number;

  constructor(private route: ActivatedRoute, private _router: Router,
    private service: ApiVisitorService, private accessData: AccessData,
    private mode: DarkMode, private font: FontSizeManipulation,
    private _location: Location) {
    this.route.params.subscribe(params => {
      this.id = Number(params.id);
      this.ArticleList = null;
      if (!Number.isNaN(this.id)) {
        this.LoadArticle();
      };
    });
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this.ArticleList) {
      this.loading.Loading(document.querySelector('.contentPage'));
    }
    if (localStorage.getItem('darkMode')) {
      this.elements.changes.subscribe(figure => {
        figure.forEach(elm => this.mode.DarkModeFigure())
      })
      document.querySelector('.navMain>ul>li')?.classList.add('darkbg');
      this.span.changes.subscribe(span => {
        this.mode.SpanNullArticle();
      })
      this.elementLi.changes.subscribe(li => {
        document.querySelectorAll('.navMain>ul>li')?.forEach(elem => {
          let link = elem.querySelector('a');
          if (link)
            this.mode.prependClass(link, 'colorLinkDarkMode')
        })
      })
      this.elementDiv.changes.subscribe(el => {
        let ele = <HTMLElement>el._results[0].nativeElement
        ele.querySelector('a').classList.add('colorLinkDarkMode')
      })

    }
    if (localStorage.getItem('FontMode')) {
      if (localStorage.getItem('FontMode') == '1') {
        this.elements.changes.subscribe(figure => {
          figure.forEach(elm => this.font.largeFontchangeAferLoad())
        })
      }
      else if (localStorage.getItem('FontMode') == '2') {
        this.elements.changes.subscribe(figure => {
          figure.forEach(elm => this.font.verylargeFontchangeAferLoad())
        })
      }
    }
  }

  ngOnDestroy() {

  }

  GoToPage() {
    this.flagSubCat = false;
    //this.beforeId=null;
    this._router.navigate(['/categories/' + this.beforeId]);
  }

  CheckBeforeId() {
    let res = this.accessData.readCategoryList();
    if (res) {
      this.beforeId = res.find(x => x.categoryId == this.id)?.aboveCategory
      if (this.beforeId)
        return true;
    }
    return false
  }

  CheckColor() {
    if(localStorage.getItem('darkMode')){
      let ele = document.querySelector('main>div>a')
      ele.classList.add('colorLinkDarkMode')
    }
  }

  GetBeforeId() {
    return this.beforeId;
  }

  GetSubCategory() {
    return this.SubCategoryList;
  }
  LoadSubCategory() {
    let res = this.accessData.readCategoryList();
    if (res) {
      this.SubCategoryList = []
      res.forEach(element => {
        if (element.aboveCategory == this.id)
          this.SubCategoryList.push(element)
      })
      if (this.SubCategoryList)
        this.flagSubCat = true
      return this.flagSubCat;
    }
  }
  GetNameCategory() {
    let result = this.accessData.readCategoryList();
    let name;
    if (result && this.id>0)
      name = result.find(x => x.categoryId == this.id).name;
    else if(this.id==0)
      name="Bez kategorii";
    return name;
  }
  LoadArticle() {
    this.service.GetArticlesByCategory(this.id).subscribe(
      (response) => {
        this.addToList(response)
        console.log('response received');
        this.CheckList();
        let checkLoadTag = document.querySelector('.contentPage');
        if (checkLoadTag)
          this.loading.LoadingDelete(<HTMLElement>checkLoadTag);
        if (this.page > 1) {
          this.executeContent();
        }
        this.page += 1;
      },
      (error) => {
        console.error('Request failed with error')
      });
  }

  CheckList() {
    this.ArticleList.forEach(article => {
      if (!article.picture)
        article.picture = this.imageDef.image;
      if (!article.descriptionImage)
        article.descriptionImage = this.imageDef.description;
    });
    if (this.ArticleList.length > 6) {
      this.isEndList = false;
    }
  }

  /*@HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;

    if (scrollPosition >= 150) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

  }*/

  /*gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }*/

  addToList(list: WListArticle[]) {
    if (!this.ArticleList)
      this.ArticleList = list;
    else {
      this.ArticleList = this.ArticleList.concat(list);
    }
  }


  executeContent() {
    if (this.startElement < this.ArticleList.length) {
      var old_height = $(document).height();
      var old_scroll = $(window).scrollTop();
      this.addArticle();
      $(document).scrollTop(old_scroll + $(document).height() - old_height);
    }
    else {
      this.isEndList = true;
    }
  }
  addArticle() {
    let listArticle = <Element>document.querySelector('.olderArticle');
    for (let i = this.startElement; i < this.ArticleList.length; i++) {
      let newElement = <Element>listArticle.querySelector('.olderArticle>figure').cloneNode(true);
      newElement.querySelector('img').src = this.ArticleList[i].picture;
      newElement.querySelector('h5').textContent = this.ArticleList[i].title;
      listArticle.appendChild(newElement);
      this.startElement += 1;
    }
  }
}

