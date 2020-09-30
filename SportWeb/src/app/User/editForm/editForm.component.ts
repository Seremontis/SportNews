import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from 'src/service/ApiService';
import { Article} from 'src/service/model/Article';
import { WCategory } from 'src/service/model/WCategory';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editForm',
  templateUrl: './editForm.component.html',
  styleUrls: ['./editForm.component.css']
})


export class EditFormComponent implements OnInit {
  
  categoryList:WCategory[];
  selectedOption:number;
  article:  Article=new  Article();
  model:Article;
  articleid:number;
  queryparam;

  constructor( public service: ApiService,private route: ActivatedRoute) { 
    this.LoadCategory(0)
    this.route.params.subscribe( params => {
      this.articleid=Number(params.id)
      this.LoadArticle(this.articleid)
    });
  }


  ngOnInit() {
  }
  //htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      }
    ]
  };

  LoadCategory(userId){
    this.service.GetCategory(userId).subscribe(
      (response) => {                           //next() callback
        console.log('response received');
        this.categoryList=response;      },
      (error) => {                        //error() callback
        console.error('Request failed with error');
        this.LoadOrErrorOption(false);
      },
      () => {
        console.info('Request completed')      //This is actually not needed 
        this.LoadOrErrorOption(true);
      });

  }


  CreateArticle(data){

  }

  LoadArticle(id:number){
    this.service.GetArticle(id).subscribe(
      (response) => {                           //next() callback
        this.article=response;          },
      (error) => {                        //error() callback
        console.error('Request failed with error');
      })
  }

  LoadOrErrorOption(flag){
    let select=document.querySelector('select');
    if(flag==true){
      select.childNodes[0].textContent='...';
    }
    else if(flag==false){
      select.childNodes[0].textContent='Wystąpił błąd';
    }    
  }
}
