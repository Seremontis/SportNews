import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduleAndScore',
  templateUrl: './scheduleAndScore.component.html',
  styleUrls: ['./scheduleAndScore.component.css']
})
export class ScheduleAndScoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
}
