import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/ApiService';
import { IUser } from 'src/service/model/Iuser';
import { ActivatedRoute } from '@angular/router';
import {IRole} from  'src/service/model/IRole';

@Component({
  selector: 'app-userEditForm',
  templateUrl: './userEditForm.component.html',
  styleUrls: ['./userEditForm.component.css']
})
export class UserEditFormComponent implements OnInit {

  
  user: IUser;
  selectedOption: number;
  userId: number = 0;
  roles:IRole[]=[];
  addOrUpdateFlag: boolean = true;
  fileToUpload: File = null;

  constructor(public service: ApiService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.userId = Number(params.id);
      if (!Number.isNaN(this.userId)) {
        this.LoadUser(this.userId);
        this.addOrUpdateFlag = false;
      }
    });
  }


  ngOnInit() {
  }


  checkModel(value) {
    this.user.userId = value.userId;
    this.user.firstName = value.firstName;
    this.user.lastName = value.lastName;
    this.user.login = value.login;
    this.user.password = value.password;
    this.user.passwordExpired = value.passwordExpired;
    this.user.roleId = value.roleId;
    this.user.userModified = null;
    this.user.lastModified = null;

    return this.user;
  }

  LoadUser(userId) {
    this.service.GetUser(userId).subscribe(
      (response) => {
        console.log('response received');
        this.user = response;
      },
      (error) => {
        console.error('Request failed with error');
      },
      () => {
        console.info('Request completed')
      });
  }
  
  RunModel(data){
    if(this.addOrUpdateFlag)
      this.CreateUser(this.checkModel(data))
    else
      this.UpdateUser(this.checkModel(data))
  }
  CreateUser(data) {
    this.service.AddArticle(data).subscribe(
      (response) => {                           //next() callback
        console.log('response received');
      },
      (error) => {                        //error() callback
        console.error('Request failed with error');
      },
      () => {
        console.info('Request completed')      //This is actually not needed 
      });
  }
  UpdateUser(data) {
    this.service.UpdateArticle(data).subscribe(
      (response) => {                           //next() callback
        console.log('response received');
      },
      (error) => {                        //error() callback
        console.error('Request failed with error');
      },
      () => {
        console.info('Request completed')      //This is actually not needed 
      });
  }

}
