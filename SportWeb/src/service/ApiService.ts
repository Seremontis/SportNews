import { Injectable, Testability } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from './model/Category';
import { WCategory } from './model/WCategory';
import { HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Article } from './model/Article';

@Injectable({
    providedIn: 'root'
})


//refreshing add, regular check to api if change table - optional
export class ApiService {
    readonly rootURL = 'http://localhost:62939/';
    datatest: any;
    readonly httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };


    constructor(private http: HttpClient) { }

    GetCategory(idUser:number=null): Observable<WCategory[]> {
        return this.http.get<WCategory[]>(this.rootURL + 'panel/GetCategory/'+idUser);
    }

    AddCategory(nameCategory: string,userId:number): Observable<any> {
        let model: Category = {
            categoryId: 0,
            name: nameCategory,
            userModified: userId,
            sortField: 0,
            lastModified: new Date()
        };
        let data = JSON.stringify(model);

        return this.http.post(this.rootURL + 'panel/AddCategory', data, this.httpOptions);
    }

    MoveUpCategory(id:number):Observable<any>{
        return this.http.put(this.rootURL + 'panel/MoveUpCategory', JSON.stringify(id), this.httpOptions);
    }

    MoveDownCategory(id:number):Observable<any>{
        return this.http.put(this.rootURL + 'panel/MoveDownCategory', JSON.stringify(id), this.httpOptions);
    }

    DeleteCategory(id:number): Observable<any>{
        return this.http.delete(this.rootURL + 'panel/DeleteCategory/'+id);
    }

    UpdateCategory(category:Category):Observable<Category>{
        return this.http.put<Category>(this.rootURL + 'panel/UpdateCategory', JSON.stringify(category),this.httpOptions)
    }

    GetArticle(id:number):Observable<Article>{
        return this.http.get<Article>(this.rootURL + 'panel/GetArticle/'+id);
    }
}