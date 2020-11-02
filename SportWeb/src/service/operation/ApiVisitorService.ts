import { Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { WFullArticle } from '../model/WFullArticle';
import { WListArticle } from '../model/WListArticle';
import { IModelKeyword } from '../model/IModelKeyword';
import { WCategory } from '../model/WCategory';

@Injectable({
    providedIn: 'root'
})

export class ApiVisitorService {
    private readonly rootURL = 'http://localhost:62939/Api/';
    private readonly httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    constructor(private http: HttpClient) { }

    CheckIsOnlineServer(){
        return this.http.get(this.rootURL);
    }

    GetFullArticle(idArticle:number): Observable<WFullArticle>{
        return this.http.get<WFullArticle>(this.rootURL + 'GetArticle/'+idArticle);
    }
    GetListArticle(page:number): Observable<WListArticle[]>{
        return this.http.get<WListArticle[]>(this.rootURL + 'GetListArticle/'+page);
    }
    GetLastArticles(page:number=1): Observable<WListArticle[]>{
        if(page>1)
            return this.http.get<WListArticle[]>(this.rootURL + 'GetListArticles/'+page);
        else{
            return this.http.get<WListArticle[]>(this.rootURL + 'GetListArticles');
        }
    }
    GetArticlesByCategory(categoryId:number,page:number=1): Observable<WListArticle[]>{
        return this.http.get<WListArticle[]>(this.rootURL + 'GetArticlesByCategory/'+categoryId+'/'+page);
    }

    GetSearch(keywords:IModelKeyword): Observable<WListArticle[]>{        
        return this.http.post<WListArticle[]>(this.rootURL + 'GetSearcher', JSON.stringify(keywords), this.httpOptions);
    }

    GetCategory(): Observable<WCategory[]>{
            return this.http.get<WCategory[]>(this.rootURL + 'GetCategories');
    }
}
