import { Injectable } from '@angular/core';
import * as crypto from '../../node_modules/crypto-js';
import { IUser } from './model/Iuser';
import { ApiService } from './ApiService';

@Injectable({
    providedIn: 'root'
})
export class Session {
    constructor(private service: ApiService) {

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
                localStorage.setItem('endTime', response.time.toString())
                window.location.href = '/user';
            },
            (error) => {
                if (error.status == 401)
                    alert('Nieprawidłowy login lub hasło')
                else
                    console.error('Request failed with error')
            },
            () => {
                console.info('Request completed')      //This is actually not needed 
            });
    }

    CheckSession() {
        this.checkExpired();
        if (localStorage.getItem('tokenLogin') && localStorage.getItem('user') && localStorage.getItem('user'))
            return true;
        else
            return false;
    }

    LogOut() {
        localStorage.removeItem('tokenLogin');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('endTime');
        window.location.href = '/';
    }

    checkExpired() {
        if (localStorage.getItem('endTime')) {
            let date = Date.parse(localStorage.getItem('endTime'));
            let now = Date.now();
            if (date < now) {
                localStorage.removeItem('tokenLogin');
                localStorage.removeItem('user');
                localStorage.removeItem('role');
                localStorage.removeItem('endTime');
            }
        }
    }
}
