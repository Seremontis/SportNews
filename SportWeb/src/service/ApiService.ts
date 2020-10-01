import { Injectable, Testability } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from './model/Category';
import { WCategory } from './model/WCategory';
import { HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Article } from './model/Article';
import { WUser } from './model/WUser';
import { WListArticle } from './model/WListArticle';

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

    GetCategory(number:number=0): Observable<WCategory[]> {
        if(number==0)
            return this.http.get<WCategory[]>(this.rootURL + 'panel/GetCategory/');
        else
            return this.http.get<WCategory[]>(this.rootURL + 'panel/GetCategory/'+number);
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

    AddArticle(model: Article,userId:number): Observable<any> {
        let data = JSON.stringify(model);
        return this.http.post(this.rootURL + 'panel/AddArticle', data, this.httpOptions);
    }

    DeleteArticle(id:number): Observable<any>{
        return this.http.delete(this.rootURL + 'panel/DeleteArticle/'+id);
    }

    UpdateArticle(category:Category):Observable<Category>{
        return this.http.put<Category>(this.rootURL + 'panel/UpdateArticle', JSON.stringify(category),this.httpOptions)
    }

    GetUsers(page:number): Observable<WUser[]>{
        return this.http.get<WUser[]>(this.rootURL + 'panel/GetWUser/'+page);
    }

    GetListArticle(page:number): Observable<WListArticle[]>{
        return this.http.get<WListArticle[]>(this.rootURL + 'panel/GetListArticle/'+page);
    }
}