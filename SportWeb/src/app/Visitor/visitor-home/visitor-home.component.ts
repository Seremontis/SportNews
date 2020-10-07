import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ApiVisitorService} from 'src/service/ApiVisitorService'
import { WListArticle } from 'src/service/model/WListArticle';
import { DefaultImage } from 'src/assets/defaultImage';
import { Loading } from 'src/assets/Loading';
import { HostListener } from '@angular/core';
import { WCategory } from 'src/service/model/WCategory';
import { DarkMode } from 'src/service/DarkMode';


declare var $: any;

@Component({
  selector: 'app-visitor-home',
  templateUrl: './visitor-home.component.html',
  styleUrls: ['./visitor-home.component.css']
})
export class VisitorHomeComponent implements OnInit {
  @ViewChildren('span') span: QueryList<any>;
  @ViewChildren('figure') elements: QueryList<any>;
  ArticleList:WListArticle[];
  private readonly imageDef:DefaultImage=new DefaultImage();
  private readonly loading:Loading=new Loading();
  startElement = 6;  
  page=1;
  isEndList: boolean = false; //no more article

  constructor(private service: ApiVisitorService,private mode:DarkMode) { 
    this.LoadArticle();
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    if(!this.ArticleList){
      this.loading.Loading(document.querySelector('.contentPage')); 
    }
    if (localStorage.getItem('darkMode')){
      this.elements.changes.subscribe(figure => {
        figure.forEach(elm => this.mode.DarkModeFigure());      
      }) 
      this.span.changes.subscribe(span => {
        this.mode.SpanNullArticle(); 
      }) 
    }    
  }

  LoadArticle(){
    this.service.GetLastArticles(this.page).subscribe(
      (response) => {
        this.addToList(response)
        console.log('response received');
        this.CheckImages();
        let checkLoadTag=document.querySelector('.contentPage');
        if(checkLoadTag)
          this.loading.LoadingDelete(<HTMLElement>checkLoadTag);
        if(this.page>1)
          this.executeContent();
        this.page+=1;
        
      },
      (error) => {                          //error() callback
        console.error('Request failed with error')
      });
  }

  CheckImages(){
    this.ArticleList.forEach(article=>{
      if(!article.smallPicture)
        article.smallPicture=this.imageDef.image;
      if(!article.descriptionImage)
        article.descriptionImage=this.imageDef.description;
    })
  }

  addToList(list:WListArticle[]){
    if(!this.ArticleList)
      this.ArticleList=list;
    else{
      this.ArticleList=this.ArticleList.concat(list);
    }
  }
 
  addContent() {
    this.LoadArticle()
  }

  executeContent(){
    if (this.startElement < this.ArticleList.length) {
      var old_height = $(document).height();
      var old_scroll = $(window).scrollTop();
      this.addArticle();
      $(document).scrollTop(old_scroll + $(document).height() - old_height);
    }
    else {
      this.isEndList = true;
      if(localStorage.getItem('darkMode')){   
      }
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
