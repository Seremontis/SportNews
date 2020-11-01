import { Injectable } from '@angular/core';
import { IUser } from '../model/IUser'
import { ApiService } from './ApiService'


@Injectable({
    providedIn: 'root'
})

export class OperationService {
    constructor(private service: ApiService) {

    }

}

