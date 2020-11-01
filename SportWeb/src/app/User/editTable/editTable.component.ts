import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouteReuseStrategy } from '@angular/router';
import { HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/service/operation/ApiService'
import { WCategory } from 'src/service/model/WCategory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCategoryEditComponent } from 'src/app/User/ModalCategoryEdit/ModalCategoryEdit.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { Category } from 'src/service/model/Category';
import { IWUser } from 'src/service/model/WUser';
import { WListArticle } from 'src/service/model/WListArticle';

@Component({
  selector: 'app-editTable',
  templateUrl: './editTable.component.html',
  styleUrls: ['./editTable.component.css']
})


export class EditTableComponent implements OnInit {
  isLoading: boolean = false;
  isError: boolean = false;
  id: number;
  mySubscription: any;
  CategoryList: WCategory[];
  UserList: IWUser[];
  ArticleList: WListArticle[];
  page: number;


  constructor(private route: ActivatedRoute, public service: ApiService, private modalService: NgbModal) {
    this.page = 1;
    this.route.params.subscribe(params => {
      this.page = 1;
      this.id = Number(params.id);
      this.runTable();
    });
  }
  ngOnInit() {
  }

  runTable() {
    switch (this.id) {
      case 1:
        this.GetListUser(1);
        break;
      case 2:
        this.GetListArticle(1);
        break;
      case 3:
        this.GetCategory();
        break;
    }
  }
  nextPageArticle() {
    this.page += 1
    this.GetListArticle(this.page)
    if(this.UserList.length==0){
      this.page -= 1
      this.GetListArticle(this.page)
      alert('Brak kolejnych rekordów')
    }         
  }

  prevPageArticle() {
    if (this.page <= 1) {
      this.page -= 1
      this.GetListArticle(this.page)
    }
  }

  nextPageUser() {   
    this.page += 1
    this.GetListUser(this.page)
    if(this.UserList.length>0){
      this.page -= 1;
      this.GetListUser(this.page)
      alert('Brak kolejnych rekordów')
    }
  }
  prevPageUser() {
    if (this.page <= 1) {
      this.page -= 1
      this.GetListUser(this.page)
    }
  }

  checkSizeUser(){
    if(this.UserList!=null){
      if(this.UserList.length==15)
        return true;
    }
    return false
  }

  checkSizeArticle(){
    if(this.ArticleList!=null){
      if(this.ArticleList.length==15)
        return true;
    }
    return false
  }

  openFormModal(data) {
    const modalRef = this.modalService.open(ModalCategoryEditComponent);
    modalRef.componentInstance.id = 10; 
    modalRef.componentInstance.category = data;
    modalRef.componentInstance.CategoryList = this.CategoryList;
    modalRef.result.then((result: Category) => {
      console.log(result);
      result.userModified = 0;       ///replace after
      this.UpdateCategory(result)
    }).catch((error) => {
      console.log(error);
    });
  }

  GetCategory() {
    this.isLoading = true;
    this.service.GetCategory().subscribe(
      (response) => {
        console.log('response received');
        this.isLoading = this.isError = false;
        this.CategoryList = response;
      },
      (error) => {
        this.isLoading = false;
        this.isError = true;
        console.log('Request failed with error')
        if (error.status == 401) {
          alert('Brak uprawnień')
          window.location.href = '/login'
        }
      },
      () => {
        console.info('Request completed')
      });
  }

  FillTrueAndFalse(numb) {
    if (numb) {
      if (numb > 0)
        return "Tak";
    }
    return "Nie";
  }

  AddCategoryForm(data) {
    this.service.AddCategory(data.value.CategoryName, 0).subscribe(
      (response) => {
        console.info('succes');
        this.GetCategory();
      },
      (error) => {
        console.log(error);
      }
    );
  }


  MoveUpCategory(id: number) {
    this.service.MoveUpCategory(id).subscribe(
      (response) => {
        this.GetCategory();
      }
    )
  }

  MoveDownCategory(id: number) {
    this.service.MoveDownCategory(id).subscribe(
      (response) => {
        this.GetCategory();
      }
    )
  }

  DeleteCategory(id: number) {
    this.service.DeleteCategory(id).subscribe(
      (response) => {
        this.GetCategory();
      }
    )
  }

  UpdateCategory(category: Category) {
    this.service.UpdateCategory(category).subscribe(
      (response) => {
        console.log('response received');
        this.GetCategory();
      },
      (error) => {
        console.error('Request failed with error')
      },
      () => {
        console.info('Request completed')
      });
  }


  GetListUser(page: number) {
    this.service.GetUsers(page).subscribe(
      (response) => {
        this.UserList = response;
        console.log('response received');
      },
      (error) => {
        console.error('Request failed with error')
      },
      () => {
        console.info('Request completed')
      });
  }
  GetListArticle(page: number) {
    this.service.GetListArticle(page).subscribe(
      (response) => {
        this.ArticleList = response;
        console.log('response received');
      },
      (error) => {
        console.error('Request failed with error')
      },
      () => {
        console.info('Request completed')
      });
  }

  DeleteArticle(id: number) {
    this.service.DeleteArticle(id).subscribe(
      (response) => {
        this.GetListArticle(1)
        console.log('response received');
      },
      (error) => {
        console.error('Request failed with error')
      },
      () => {
        console.info('Request completed')
      });
  }

  DeleteUser(id: number) {
    this.service.DeleteUser(id).subscribe(
      (response) => {
        this.GetListUser(1)
        console.log('response received');
      },
      (error) => {
        console.error('Request failed with error')
      },
      () => {
        console.info('Request completed')
      });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
