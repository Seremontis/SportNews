import { Component, OnInit } from '@angular/core';
import { ApiVisitorService} from 'src/service/ApiVisitorService'
import { WListArticle } from 'src/service/model/WListArticle';
import { DefaultImage } from 'src/assets/defaultImage';

@Component({
  selector: 'app-visitor-home',
  templateUrl: './visitor-home.component.html',
  styleUrls: ['./visitor-home.component.css']
})
export class VisitorHomeComponent implements OnInit {

/*  arraytest: { id: string, name: string }[] = [
    { "id": "Available", "name": "/assets/test/pexels.jpg" },
    { "id": "Available2", "name": "/assets/test/pexels.jpg" },
    { "id": "Available3", "name": "/assets/test/pexels.jpg" },
    { "id": "Available4", "name": "/assets/test/pexels.jpg" },
    { "id": "Available5", "name": "/assets/test/pexels.jpg" },
    { "id": "Available6", "name": "/assets/test/pexels.jpg" },
    { "id": "Available7", "name": "/assets/test/pexels.jpg" },
  ];*/
  ArticleList:WListArticle[];
  private readonly imageDef:DefaultImage=new DefaultImage();

  constructor(private service: ApiVisitorService,) { 
    this.LoadArticle();
  }

  ngOnInit(): void {
  }

  LoadArticle(){
    this.service.GetLastArticles().subscribe(
      (response) => {
        this.ArticleList = response;                    //next() callback
        console.log('response received');
        this.CheckImages();
      },
      (error) => {                          //error() callback
        console.error('Request failed with error')
      })
  }

  CheckImages(){
    this.ArticleList.forEach(article=>{
      if(!article.smallPicture)
        article.smallPicture=this.imageDef.image;
      if(!article.descriptionImage)
        article.descriptionImage=this.imageDef.description;
    })
  }
}
