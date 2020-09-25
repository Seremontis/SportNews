import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barUser',
  templateUrl: './barUser.component.html',
  styleUrls: ['./barUser.component.css']
})
export class BarUserComponent implements OnInit {
  userName='test';
  constructor() { }

  ngOnInit() {
  }

}
