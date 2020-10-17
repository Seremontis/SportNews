import { Component, OnInit } from '@angular/core';
import { SportResult } from 'src/service/SportResult';
import { IModelResult } from 'src/service/model/IModelResult'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-scheduleAndScore',
  templateUrl: './scheduleAndScore.component.html',
  styleUrls: ['./scheduleAndScore.component.css']
})
export class ScheduleAndScoreComponent implements OnInit {
  pastlist: IModelResult[];
  nextlist: IModelResult[];

  constructor(private sportApi: SportResult, private datePipe: DatePipe) {
    if (!localStorage.getItem('SportChoose')) {
      this.SelectedResultFootbal();
      localStorage.setItem('SportChoose', '1')
    }
    else {
      switch (localStorage.getItem('SportChoose')) {
        case '1':
          this.SelectedResultFootbal();
          break;
        case '2':
          this.SelectedResultBasketball();
          break;
        case '3':
          this.SelectedResultTennis();
          break;
        case '4':
          break;
        default:
          break;
      }
    }
  }

  SelectedResultFootbal() {
    if ((!localStorage.getItem('SportChoose') || localStorage.getItem('SportChoose') != '1') || (!this.pastlist)) {
      this.pastlist = [];
      this.nextlist = []
      this.sportApi.GetFootballResult(true).then(resp => {
        this.pastlist = resp;
      });
      this.sportApi.GetFootballResult().then(resp => {
        this.nextlist = resp;
      });
      localStorage.setItem('SportChoose', '1')

    }
  }

  SelectedResultBasketball() {
    
    if (localStorage.getItem('SportChoose')) {
      if (localStorage.getItem('SportChoose') != '2' || (!this.pastlist)) {
        this.pastlist = [];
        this.nextlist = []
        this.sportApi.GetBasketballResult().then(resp => {
          this.pastlist = resp;
        });
        localStorage.setItem('SportChoose', '2')

      }
    }
  }
  SelectedResultTennis(){
    if (localStorage.getItem('SportChoose')) {
      if (localStorage.getItem('SportChoose') != '3' || (!this.pastlist)) {
        this.pastlist = [];
        this.nextlist = []
        this.sportApi.GetBasketballResult().then(resp => {
          this.pastlist = resp;
        });
        localStorage.setItem('SportChoose', '3')

      }
    }
  }

  CheckListFill() {
    if (this.pastlist.length > 0)
      return true
    else
      return false
  }

  returnPastlList() {
    return this.pastlist
  }
  returnNextlList() {
    return this.nextlist
  }

  ngOnInit() {
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }
}
