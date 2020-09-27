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


@Component({
  selector: 'app-editTable',
  templateUrl: './editTable.component.html',
  styleUrls: ['./editTable.component.css']
})
export class EditTableComponent implements OnInit {
  isLoading: boolean = false;
  isError: boolean = false;
  form: FormGroup;
  queryParam;
  name: number;
  mySubscription: any;
  rows = [];
  CategoryList: WCategory[];

  constructor(private _routeParams: ActivatedRoute, private router: Router, public service: ApiService, private modalService: NgbModal) {
    this.queryParam = this._routeParams.queryParamMap
      .subscribe(params => {
        this.name = Number(params.get('Name'));
      });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
    for (let i = 0; i < 10; i++) {
      this.rows.push(i + 1);
    }
    this.runTable();
  }
  ngOnInit() {
  }

  runTable() {
    switch (this.name) {
      case 1:
        break;
      case 2:
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

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
