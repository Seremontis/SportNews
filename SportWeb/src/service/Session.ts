import { Injectable} from '@angular/core';
import * as crypto from '../../node_modules/crypto-js';
import { IUser } from './model/Iuser';
import { ApiService } from './ApiService';

@Injectable({
    providedIn: 'root'
})
export class Session {
    constructor(private  service:ApiService){

    }
    LogIn(data) {
        let user: IUser = {
            login: data.value.login,
            password: crypto.SHA1(data.value.password).toString(),
        };
        this.service.CheckLoggin(user).subscribe(
            (response) => {
                localStorage.setItem('tokenLogin', response.token)
                localStorage.setItem('user', response.userDetail.idUser.toString())
                localStorage.setItem('role', response.userDetail.role.toString())
                window.location.href = '/user';
            },
            (error) => {

                console.error('Request failed with error')
            },
            () => {
                console.info('Request completed')      //This is actually not needed 
            });
    }

    CheckSession(){
        if(localStorage.getItem('tokenLogin'))
            return true;
        else 
            return false;
    }

    LogOut(){
        localStorage.removeItem('tokenLogin');
        window.location.href = '/';
    }
}
