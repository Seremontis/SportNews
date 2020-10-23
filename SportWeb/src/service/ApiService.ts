import { Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from './model/Category';
import { WCategory } from './model/WCategory';
import { HttpHeaders } from '@angular/common/http';
import { Article } from './model/Article';
import { WUser } from './model/WUser';
import { WListArticle } from './model/WListArticle';
import { IUser } from './model/Iuser';
import {IModelAuth} from './model/ImodelAuth'

@Injectable({
    providedIn: 'root'
})


//refreshing add, regular check to api if change table - optional
export class ApiService {
    readonly rootURL = 'http://localhost:62939/panel/';


    constructor(private http: HttpClient) {
     }

    GetHeader(){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('tokenLogin')??'' });
        let options = { headers: headers };
        return options
    }
    CheckLoggin(user:IUser){
        return this.http.post<any>('http://localhost:62939/Login', user);
    }

   
    GetCategory(number:number=0): Observable<WCategory[]> {
        if(number==0)
            return this.http.get<WCategory[]>(this.rootURL + 'GetCategory/',this.GetHeader());
        else
            return this.http.get<WCategory[]>(this.rootURL + 'GetCategory/'+number,this.GetHeader());
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

        return this.http.post(this.rootURL + 'AddCategory', data, this.GetHeader());
    }

    MoveUpCategory(id:number):Observable<any>{   
        return this.http.put(this.rootURL + 'MoveUpCategory', JSON.stringify(id), this.GetHeader());
    }

    MoveDownCategory(id:number):Observable<any>{
        return this.http.put(this.rootURL + 'MoveDownCategory', JSON.stringify(id), this.GetHeader());
    }

    DeleteCategory(id:number): Observable<any>{
        return this.http.delete(this.rootURL + 'DeleteCategory/'+id,this.GetHeader());
    }

    UpdateCategory(category:Category):Observable<Category>{
        return this.http.put<Category>(this.rootURL + 'UpdateCategory', JSON.stringify(category),this.GetHeader())
    }

    GetArticle(id:number):Observable<Article>{
        return this.http.get<Article>(this.rootURL + 'GetArticle/'+id,this.GetHeader());
    }

    AddArticle(model: Article,userId:number): Observable<any> {
        let data = JSON.stringify(model);
        return this.http.post(this.rootURL + 'AddArticle', data, this.GetHeader());
    }

    DeleteArticle(id:number): Observable<any>{
        return this.http.delete(this.rootURL + 'DeleteArticle/'+id,this.GetHeader());
    }

    UpdateArticle(category:Category):Observable<Category>{
        return this.http.put<Category>(this.rootURL + 'UpdateArticle', JSON.stringify(category),this.GetHeader())
    }

    GetUsers(page:number): Observable<WUser[]>{
        return this.http.get<WUser[]>(this.rootURL + 'GetWUser/'+page,this.GetHeader());
    }

    GetListArticle(page:number): Observable<WListArticle[]>{
        return this.http.get<WListArticle[]>(this.rootURL + 'GetListArticle/'+page,this.GetHeader());
    }


}