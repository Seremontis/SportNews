import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitor-home',
  templateUrl: './visitor-home.component.html',
  styleUrls: ['./visitor-home.component.css']
})
export class VisitorHomeComponent implements OnInit {

  arraytest: { id: string, name: string }[] = [
    { "id": "Available", "name": "/assets/test/pexels.jpg" },
    { "id": "Available2", "name": "/assets/test/pexels.jpg" },
    { "id": "Available3", "name": "/assets/test/pexels.jpg" },
    { "id": "Available4", "name": "/assets/test/pexels.jpg" },
    { "id": "Available5", "name": "/assets/test/pexels.jpg" },
    { "id": "Available6", "name": "/assets/test/pexels.jpg" },
    { "id": "Available7", "name": "/assets/test/pexels.jpg" },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
