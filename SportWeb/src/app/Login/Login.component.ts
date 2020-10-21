import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/ApiService';
import { IUser } from 'src/service/model/IUser';
//import {CryptoJS} from 'node_modules/crypto-js'
import * as crypto from 'node_modules/crypto-js';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public service:ApiService) { }

  ngOnInit() {
  }

  CheckUser(data){
    let user : IUser = {
      login:data.value.login,
      password:crypto.SHA1(data.value.password).toString(),
      Role:null,
      userType:null
    };
    this.service.CheckLoggin(user).subscribe(
      (response) => {       
        localStorage.setItem('tokenLogin', response.token)
        window.location.href='/user';
      },
      (error) => {
        
        console.error('Request failed with error')
      },
      () => {
        console.info('Request completed')      //This is actually not needed 
      });
  }
}


