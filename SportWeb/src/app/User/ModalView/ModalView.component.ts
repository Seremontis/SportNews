import { Component,OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IArticle } from 'src/service/model/Article';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultImage } from 'src/assets/defaultImage';

@Component({
  selector: 'app-ModalView',
  templateUrl: './ModalView.component.html',
  styleUrls: ['./ModalView.component.css']
})
export class ModalViewComponent implements OnInit {
  @Input() article: IArticle;
  private readonly imageDefault: DefaultImage = new DefaultImage();

  constructor(public activeModal: NgbActiveModal) {  
    console.log(this.article)  
   }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.CheckImageAndDescription()
  }

  CheckImageAndDescription() {
    if (!this.article.picture)
      this.article.picture = this.imageDefault.image;
    if (!this.article.descritpionPicture)
      this.article.descritpionPicture = this.imageDefault.description;
  }
}
