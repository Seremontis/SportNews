import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouteReuseStrategy } from '@angular/router';
import { HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiService} from 'src/app/model/ApiService'


@Component({
  selector: 'app-editTable',
  templateUrl: './editTable.component.html',
  styleUrls: ['./editTable.component.css']
})
export class EditTableComponent implements OnInit {
  queryParam;
  name: number;
  mySubscription: any;
  rows = [];
  constructor(private _routeParams: ActivatedRoute, private router: Router,public service: ApiService) {
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
        this.service.GetCategory().subscribe(
          (response) => {                           //next() callback
            console.log('response received')
          },
          (error) => {                              //error() callback
            console.error('Request failed with error')
          },
          () => {                                   //complete() callback
            console.error('Request completed')      //This is actually not needed 
          })
        break;
    }
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
