import { Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { WFullArticle } from './model/WFullArticle';
import { WListArticle } from './model/WListArticle';

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
    GetLastArticles(): Observable<WListArticle[]>{
        return this.http.get<WListArticle[]>(this.rootURL + 'GetLastArticles');
    }
    GetArticlesByCategory(categoryId:number,page:number=1): Observable<WListArticle[]>{
        return this.http.get<WListArticle[]>(this.rootURL + 'GetArticlesByCategory/'+categoryId+'/'+page);
    }
}
