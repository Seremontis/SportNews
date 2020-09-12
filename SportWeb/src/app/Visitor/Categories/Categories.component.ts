import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouteReuseStrategy } from '@angular/router';
import { HostListener } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-Categories',
  templateUrl: './Categories.component.html',
  styleUrls: ['./Categories.component.css']
})
export class CategoriesComponent implements OnInit {
  queryParam;
  name = null;
  arraytest: { id: string, name: string }[] = [
    { "id": "Available", "name": "/assets/test/pexels.jpg" },
    { "id": "Available2", "name": "/assets/test/pexels.jpg" },
    { "id": "Available3", "name": "/assets/test/pexels.jpg" },
    { "id": "Available4", "name": "/assets/test/pexels.jpg" },
    { "id": "Available5", "name": "/assets/test/pexels.jpg" },
    { "id": "Available6", "name": "/assets/test/pexels.jpg" },
    { "id": "Available7", "name": "/assets/test/pexels.jpg" },
  ];

  newArray: { id: string, name: string }[] = [
    { "id": "Available12", "name": "/assets/test/pexels.jpg" },
    { "id": "Available23", "name": "/assets/test/pexels.jpg" },
    { "id": "Available32", "name": "/assets/test/pexels.jpg" },
    { "id": "Available44", "name": "/assets/test/pexels.jpg" },
  ];
  isShow: boolean; //button parameter
  isEndList: boolean; //no more article
  startElement = 0;
  mySubscription: any;

  constructor(private _routeParams: ActivatedRoute,private router: Router) {
    this.queryParam = this._routeParams.queryParamMap
      .subscribe(params => {
        this.name = params.get('Name');
      });
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });
  }
  ngOnInit() {
  }

ngOnDestroy() {
  if (this.mySubscription) {
    this.mySubscription.unsubscribe();
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

    if (pos > max - 50) {
      this.addContent();
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  addContent() {
    if (this.startElement < this.newArray.length) {
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
    for (let i = this.startElement; i < this.newArray.length; i++) {
      let newElement = <Element>listArticle.querySelector('.olderArticle>figure').cloneNode(true);
      newElement.querySelector('img').src = this.newArray[i].name;
      newElement.querySelector('h5').textContent = this.newArray[i].id;
      listArticle.appendChild(newElement);
      this.startElement += 1;
    }
  }
}

