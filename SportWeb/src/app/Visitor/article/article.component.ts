import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiVisitorService } from 'src/service/operation/ApiVisitorService';
import { WFullArticle } from 'src/service/model/WFullArticle';
import { DatePipe } from '@angular/common';
import { DefaultImage } from 'src/assets/defaultImage';
import { FontSizeManipulation } from 'src/service/operation/FontSizeManipulation';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @ViewChildren('figure') elements: QueryList<any>;
  articleId: number;
  FullArticle: WFullArticle;

  constructor(private route: ActivatedRoute, private service: ApiVisitorService,
     private datePipe: DatePipe,private font:FontSizeManipulation,private readonly imageDefault: DefaultImage) {
    this.route.params.subscribe(params => {
      this.articleId = Number(params.id);
      if (!Number.isNaN(this.articleId)) {
        this.LoadArticle(this.articleId);
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.checkMode()
  }

  LoadArticle(id: number) {
    this.service.GetFullArticle(id).subscribe(
      (response) => {
        console.log('response received');
        this.FullArticle = response;
        this.CheckImageAndDescription()
      },
      (error) => {
        console.error('Request failed with error');
      });
  }

  CheckImageAndDescription() {
    if (!this.FullArticle.picture)
      this.FullArticle.picture = this.imageDefault.image;
    if (!this.FullArticle.pictureDescirption)
      this.FullArticle.pictureDescirption = this.imageDefault.description;
  }
  GetEditorNameOrDate() {
    return this.FullArticle?.firstName + ' ' + this.FullArticle?.lastName + ', ' + (this.datePipe.transform(this.FullArticle?.publicationTime, "dd-MM-yyyy"));
  }
  
  checkSourcPic(){
    if(this.FullArticle?.sourcePicture)
      return this.FullArticle.sourcePicture
    else
      return "opracowanie własne"
  }
  checkMode(){
    if (localStorage.getItem('darkMode')) {
      this.elements.changes.subscribe(figure => {
        figure.forEach(elm => {
          document.querySelector('article').classList.add('darkbackground');
          document.querySelector('figcaption').classList.add('DarkIconColor');
        })})
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
}
