import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './ApiService';
import { WCategory } from './model/WCategory';

@Injectable(
    {
        providedIn: "root"
    })
export class AccessData {
    categoryList: WCategory[];
    constructor(private apiSevice: ApiService) { }

    SetCategoryList(list: WCategory[]) {
        this.categoryList = null;
        this.categoryList = list;
    }

    readCategoryList() {
        if (!this.categoryList) {
            this.apiSevice.GetCategory().subscribe(
                (response) => {
                    console.log('response received');
                    this.categoryList = response;
                },
                (error) => {
                    console.error('Request failed with error')
                });
        }
        return this.categoryList;
    }

}