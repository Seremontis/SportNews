import { Component, OnInit } from '@angular/core';
import { ApiVisitorService } from 'src/service/ApiVisitorService';

@Component({
  selector: 'app-visitor-layout',
  templateUrl: './visitor-layout.component.html',
  styleUrls: ['./visitor-layout.component.css']
})
export class VisitorLayoutComponent implements OnInit {

  constructor(private service: ApiVisitorService) {
    this.CheckIsOnlineServer();
  }

  ngOnInit(): void {
  }

  CheckIsOnlineServer() {
    this.service.CheckIsOnlineServer().subscribe(
      (response) =>{},
      (error) => {
        //console.error('Request failed with error');
        if(error.status==0 || error.status>499)
          alert("Brak połaczenia z serwerem");
      });
  }

}
