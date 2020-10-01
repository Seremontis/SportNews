import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from 'src/service/ApiService';
import { Article} from 'src/service/model/Article';
import { WCategory } from 'src/service/model/WCategory';
import { ActivatedRoute } from '@angular/router';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-articleForm',
  templateUrl: './articleForm.component.html',
  styleUrls: ['./articleForm.component.css']
})


export class ArticleFormComponent implements OnInit {
  
  categoryList:WCategory[];
  selectedOption:number;
  article:  Article=new  Article();
  model:Article;
  articleid:number=0;
  addOrUpdateFlag:boolean=true;

  constructor( public service: ApiService,private route: ActivatedRoute) { 
    this.LoadCategory(0)
    this.route.params.subscribe( params => {
      this.articleid=Number(params.id);
      if(!Number.isNaN(this.articleid)){
        this.LoadArticle(this.articleid);
        this.addOrUpdateFlag=false;
      }
    });
  }


  ngOnInit() {
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['textColor','backgroundColor','customClasses','link',
    'unlink','insertImage','insertVideo']],
    customClasses: []
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

  RunArticle(data){
    if(this.addOrUpdateFlag)
      this.CreateArticle(data.value);    
    else
      this.UpdateArticle(data.value);
  }


  CreateArticle(data){
    this.service.AddArticle(data,1).subscribe(
      (response) => {                           //next() callback
        console.log('response received');     },
      (error) => {                        //error() callback
        console.error('Request failed with error');
      },
      () => {
        console.info('Request completed')      //This is actually not needed 
      });
  }
  UpdateArticle(data){
    this.service.UpdateArticle(data).subscribe(
      (response) => {                           //next() callback
        console.log('response received');     },
      (error) => {                        //error() callback
        console.error('Request failed with error');
      },
      () => {
        console.info('Request completed')      //This is actually not needed 
      });
  }

  LoadArticle(id:number){
    this.service.GetArticle(id).subscribe(
      (response) => {                           //next() callback
        this.article=response;        },
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
