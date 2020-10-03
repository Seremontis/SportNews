import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiVisitorService } from 'src/service/ApiVisitorService';
import { WFullArticle } from 'src/service/model/WFullArticle';
import { DatePipe } from '@angular/common';
import { DefaultImage } from 'src/assets/defaultImage';
import { VirtualTimeScheduler } from 'rxjs';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articleId:number;
  FullArticle:WFullArticle;
  private readonly imageDefault: DefaultImage=new DefaultImage();
  
  constructor(private route: ActivatedRoute,private service:ApiVisitorService,private datePipe: DatePipe) {
    this.route.params.subscribe( params => {
      this.articleId=Number(params.id);
      if(!Number.isNaN(this.articleId)){
        this.LoadArticle(this.articleId);
      }
    });
   }

  ngOnInit() {
  }

  LoadArticle(id:number){
    this.service.GetFullArticle(id).subscribe(
      (response) => {                           //next() callback
        console.log('response received');
        this.FullArticle=response; 
      this.CheckImageAndDescription()
         },
      (error) => {                        //error() callback
        console.error('Request failed with error');
      },
      () => {
        console.info('Request completed')      //This is actually not needed 
      });
  }

  CheckImageAndDescription(){
    if(!this.FullArticle.picture)
      this.FullArticle.picture=this.imageDefault.image;
    if(!this.FullArticle.pictureDescirption)
      this.FullArticle.pictureDescirption=this.imageDefault.description;
  }
  GetEditorNameOrDate(){
    return this.FullArticle?.firstName+' '+this.FullArticle?.lastName+', '+(this.datePipe.transform(this.FullArticle?.publicationTime,"dd-MM-yyyy"));
  }
}
