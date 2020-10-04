import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouteReuseStrategy } from '@angular/router';
import { HostListener } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { WListArticle } from 'src/service/model/WListArticle';
import { ApiVisitorService } from 'src/service/ApiVisitorService';
import { DefaultImage } from 'src/assets/defaultImage';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-Categories',
  templateUrl: './Categories.component.html',
  styleUrls: ['./Categories.component.css']
})
export class CategoriesComponent implements OnInit {
  queryParam;
  id = null;
  isShow: boolean; //button parameter
  isEndList: boolean = true; //no more article
  ArticleList: WListArticle[];
  private imageDef: DefaultImage = new DefaultImage();
  startElement = 0;
  //mySubscription: any;

  constructor(private route: ActivatedRoute/*, private router: Router*/, private service: ApiVisitorService) {
    this.route.params.subscribe(params => {
      this.id = Number(params.id);
      if (!Number.isNaN(this.id)) {
        this.LoadArticle();
      }
    });
    //alert('jak rozwiązać kwestię taba');
    /*this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };*/
    /*this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });*/
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    /*if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }*/
  }
  GetNameCategory() {
    if (this.ArticleList)
      return this.ArticleList[0].name;
  }
  LoadArticle() {
    this.service.GetArticlesByCategory(this.id).subscribe(
      (response) => {
        this.ArticleList = response;                    //next() callback
        console.log('response received');
        this.CheckList();
      },
      (error) => {                          //error() callback
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

  addContent() {
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

