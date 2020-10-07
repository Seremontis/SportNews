import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouteReuseStrategy } from '@angular/router';
import { HostListener } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { WListArticle } from 'src/service/model/WListArticle';
import { ApiVisitorService } from 'src/service/ApiVisitorService';
import { DefaultImage } from 'src/assets/defaultImage';
import { AccessData } from 'src/service/AccessData';
import { Loading } from 'src/assets/Loading';
import { DarkMode } from 'src/service/DarkMode';

declare var $: any;

@Component({
  selector: 'app-Categories',
  templateUrl: './Categories.component.html',
  styleUrls: ['./Categories.component.css']
})
export class CategoriesComponent implements OnInit {

  
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

  constructor(private route: ActivatedRoute, private _router: Router, private service: ApiVisitorService, private accessData: AccessData,private mode:DarkMode) {
    this.route.params.subscribe(params => {
      this.id = Number(params.id);
      this.ArticleList = null;
      if (!Number.isNaN(this.id)) {
        this.LoadArticle();
      };
      /*_router.events.subscribe((val) => {
        this.selectedATag();
    });*/
    });
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this.ArticleList) {
      this.loading.Loading(document.querySelector('.contentPage'));
    }
    if (localStorage.getItem('darkMode')){
      this.elements.changes.subscribe(figure => {
        figure.forEach(elm => this.mode.DarkModeFigure())
      }) 
      this.span.changes.subscribe(span => {
        this.mode.SpanNullArticle(); 
      }) 
    }    
  }

  /*selectedATag(){
    if(this.id){
      let searchName=this.accessData.readCategoryList().find(x=>x.categoryId==this.id).name;
      let link=document.querySelector('nav');
      link.childNodes.forEach(element=>{
        
        element.childNodes.forEach(subelement => {
          let tmp=<HTMLElement>subelement;
          if(tmp.textContent==searchName){
            tmp.style.background='yellow';
            tmp.style.color='black';
          }
        });
      })
    }
  }*/

  ngOnDestroy() {

  }
  GetNameCategory() {
      let result = this.accessData.readCategoryList();
      let name;
      if (result)
        name = result.find(x => x.categoryId == this.id).name;
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
        if (this.page > 1){         
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
      if (!article.smallPicture)
        article.smallPicture = this.imageDef.image;
      if (!article.descriptionImage)
        article.descriptionImage = this.imageDef.description;
    });
    if (this.ArticleList.length > 6) {
      this.isEndList = false;
    }
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

    /*if (pos > max - 50) {
      this.addContent();
    }*/
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  addToList(list: WListArticle[]) {
    if (!this.ArticleList)
      this.ArticleList = list;
    else {
      this.ArticleList = this.ArticleList.concat(list);
    }
  }

  addContent() {
    this.LoadArticle()
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
      newElement.querySelector('img').src = this.ArticleList[i].smallPicture;
      newElement.querySelector('h5').textContent = this.ArticleList[i].title;
      listArticle.appendChild(newElement);
      this.startElement += 1;
    }
  }
}

