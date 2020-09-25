import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editTable',
  templateUrl: './editTable.component.html',
  styleUrls: ['./editTable.component.css']
})
export class EditTableComponent implements OnInit {

  flaga:boolean;
  flaga2:boolean;
  flaga3:boolean;
  rows=[];
  constructor() {
    for(let i=0;i<10;i++){
      this.rows.push(i+1);
    }
    this.flaga=true;
    this.flaga2=false;
    this.flaga3=false;
   }

  ngOnInit() {
  }

}
