import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultImage } from 'src/assets/defaultImage';
import { Loading } from 'src/assets/Loading';
import { AccessData } from 'src/service/AccessData';
import { ApiVisitorService } from 'src/service/ApiVisitorService';
import { DarkMode } from 'src/service/DarkMode';
import { FontSizeManipulation } from 'src/service/FontSizeManipulation';
import { IModelKeyword } from 'src/service/model/IModelKeyword';
import { WListArticle } from 'src/service/model/WListArticle';


declare var $: any;

@Component({
  selector: 'app-SearchResult',
  templateUrl: './SearchResult.component.html',
  styleUrls: ['./SearchResult.component.css']
})
export class SearchResultComponent implements OnInit {

  @ViewChildren('span') span: QueryList<any>;
  @ViewChildren('figure') elements: QueryList<any>;

  isShow: boolean; //button parameter
  isEndList: boolean = true; //no more article
  ArticleList: WListArticle[];
  private imageDef: DefaultImage = new DefaultImage();
  private readonly loading: Loading = new Loading();
  startElement = 6;
  page = 1;
  constructor(private route: ActivatedRoute, private _router: Router,
    private service: ApiVisitorService, private accessData: AccessData,
    private mode: DarkMode, private font: FontSizeManipulation) {
    this.route.params.subscribe(params => {
      this.ArticleList = null;
      if (localStorage.getItem('searchtext')) {
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
      this.span.changes.subscribe(span => {
        this.mode.SpanNullArticle();
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


  LoadArticle() {
    if(localStorage.getItem('searchtext')){
      let model:IModelKeyword= {keywords:localStorage.getItem('searchtext'),page:this.page}
      this.service.GetSearch(model).subscribe(
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

  addToList(list: WListArticle[]) {
    if (!this.ArticleList)
      this.ArticleList = list;
    else {
      this.ArticleList = this.ArticleList.concat(list);
    }
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
}
