import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouteReuseStrategy } from '@angular/router';
import { HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/service/ApiService'
import { WCategory } from 'src/service/model/WCategory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalUserComponent } from 'src/app/User/ModalUser/ModalUser.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { Category } from 'src/service/model/Category';
import { WUser } from 'src/service/model/WUser';
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
  UserList: WUser[];
  ArticleList: WListArticle[];


  constructor(private route: ActivatedRoute, public service: ApiService, private modalService: NgbModal) {
    this.route.params.subscribe(params => {
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

  openFormModal(data) {
    const modalRef = this.modalService.open(ModalUserComponent);
    modalRef.componentInstance.id = 10; // should be the id
    modalRef.componentInstance.category = data;
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
      (response) => {                           //next() callback
        console.log('response received');
        this.isLoading = this.isError = false;
        this.CategoryList = response;
      },
      (error) => {
        this.isLoading = false;
        this.isError = true;                           //error() callback
        console.error('Request failed with error')
      },
      () => {
        console.info('Request completed')      //This is actually not needed 
      });
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
      (response) => {                           //next() callback
        console.log('response received');
        this.GetCategory();
      },
      (error) => {                          //error() callback
        console.error('Request failed with error')
      },
      () => {
        console.info('Request completed')      //This is actually not needed 
      });
  }


  GetListUser(page: number) {
    this.service.GetUsers(page).subscribe(
      (response) => {
        this.UserList = response;                    //next() callback
        console.log('response received');
      },
      (error) => {                          //error() callback
        console.error('Request failed with error')
      },
      () => {
        console.info('Request completed')      //This is actually not needed 
      });
  }
  GetListArticle(page: number) {
    this.service.GetListArticle(page).subscribe(
      (response) => {
        this.ArticleList = response;                    //next() callback
        console.log('response received');
      },
      (error) => {                          //error() callback
        console.error('Request failed with error')
      },
      () => {
        console.info('Request completed')      //This is actually not needed 
      });
  }

  ModalDelete(id: number) {

  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
