import { Component, OnInit } from '@angular/core';
import {ApiService} from 'src/service/ApiService';

@Component({
  selector: 'app-barUser',
  templateUrl: './barUser.component.html',
  styleUrls: ['./barUser.component.css']
})
export class BarUserComponent implements OnInit {
  userName='';
  model=true;
  constructor(private service:ApiService) {
    this.GetUserName()
  }

  ngOnInit() {
  }
  
  showHideMenu() {
    if(this.model){
      document.querySelector('nav').style.visibility='visible';
      let navTop=<HTMLElement>document.querySelector('.NavTopUser');
      navTop.classList.add('NavSelected');
      navTop.style.position='fixed';
    }
    else{
      document.querySelector('nav').style.visibility='hidden';
      let navTop=<HTMLElement>document.querySelector('.NavTopUser');
      navTop.classList.remove('NavSelected');
      navTop.style.position='relative';
    }
    this.model=!this.model;
  }
  LogOut(){
    localStorage.removeItem('tokenLogin');
    window.location.href='/';
  }

  GetUserName(){
    this.service.GetUser().subscribe(
      (response) => {           
        console.log('response received');
        this.userName= response.firstName+' '+response.lastName
      },
      (error) => {                          
        console.error('Request failed with error')
      },
      () => {
        console.info('Request completed')     
      });
  }
}
