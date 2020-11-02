import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from 'src/service/operation/ApiService';
import { IArticle } from 'src/service/model/Article';
import { WCategory } from 'src/service/model/WCategory';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalViewComponent } from '../ModalView/ModalView.component';

@Component({
  selector: 'app-articleForm',
  templateUrl: './articleForm.component.html',
  styleUrls: ['./articleForm.component.css']
})


export class ArticleFormComponent implements OnInit {

  categoryList: WCategory[];
  selectedOption: number;
  article: IArticle;
  articleid: number = 0;
  addOrUpdateFlag: boolean = true;
  fileToUpload: File = null;

  constructor(public service: ApiService, private route: ActivatedRoute, private modalService: NgbModal) {
    this.LoadCategory(0)
    this.route.params.subscribe(params => {
      this.articleid = Number(params.id);
      if (!Number.isNaN(this.articleid)) {
        this.LoadArticle(this.articleid);
        this.addOrUpdateFlag = false;
      }
    });
    if (!this.articleid) {
      this.article = {
        articleId: null,
        authorId: null,
        title: null,
        picture: null,
        descritpionPicture: null,
        sourcePicture: null,
        sourceArticle:null,
        shortArticle: null,
        fullArticle: null,
        keywords: null,
        publicationTime: null,
        categoryId: null,
        userModified: null,
        lastModified: null,
      };
    }

  }

  ngOnInit() {
  }

  handleUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result)
          this.article.picture = reader.result.toString();
      };
    }
  }

  resetImage() {
    this.article.picture = '';
  }

  openFormModal(data) {
    const modalRef = this.modalService.open(ModalViewComponent, { size: 'modalCustom', });
    data.value.picture = this.article.picture;
    modalRef.componentInstance.article = this.checkModel(data.value);
    modalRef.result.then((result: IArticle) => {
      console.log(result);

    }).catch((error) => {
      console.log(error);
    });
  }


  checkModel(value) {
    this.article.title = value.title;
    this.article.categoryId = value.categoryId==0?null:value.categoryId;
    this.article.keywords = value.keywords;
    this.article.shortArticle = value.shortArticle;
    this.article.fullArticle = value.fullArticle;
    this.article.sourcePicture=value.sourcePicture;
    this.article.sourceArticle=value.sourceArticle;

    return this.article;
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
      ['textColor', 'backgroundColor', 'customClasses', 'link',
        'unlink', 'insertImage', 'insertVideo']],
    customClasses: []
  };

  LoadCategory(userId) {
    this.service.GetCategory(userId).subscribe(
      (response) => {                         
        console.log('response received');
        this.categoryList = response;
      },
      (error) => {              
        console.error('Request failed with error');
        this.LoadOrErrorOption(false);
      },
      () => {
        this.LoadOrErrorOption(true);
      });
  }

  RunArticle(data) {
    if (this.addOrUpdateFlag)
      this.CreateArticle(data.value);
    else
      this.UpdateArticle(data.value);
  }


  CreateArticle(data) {
    this.service.AddArticle(data).subscribe(
      (response) => {                          
        console.log('response received');
        alert('Zapisano')
        window.location.href='/user/editTable/2'
      },
      (error) => {                       
        console.error('Request failed with error');
        alert('Wystapił błąd')
      });
  }
  UpdateArticle(data) {
    this.checkModel(data);
    this.service.UpdateArticle(this.article).subscribe(
      (response) => {                           
        console.log('response received');
        alert('Zapisano')
        window.location.href='/user/editTable/2'
      },
      (error) => {                       
        console.error('Request failed with error');
        alert('Wystapił błąd')
      });
  }

  LoadArticle(id: number) {
    this.service.GetArticle(id).subscribe(
      (response) => {                          
        this.article = response;
      },
      (error) => {                     
        console.error('Request failed with error');
      })
  }

  LoadOrErrorOption(flag) {
    let select = document.querySelector('select');
    if (flag == true) {
      select.childNodes[0].textContent = '...';
    }
    else if (flag == false) {
      select.childNodes[0].textContent = 'Wystąpił błąd';
    }
  }
}
