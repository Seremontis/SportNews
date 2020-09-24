import { Injectable, Testability } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    readonly rootURL = 'http://localhost:62939/';
    datatest: any;
    constructor(private http: HttpClient) { }

    GetCategory(): Observable<any> {
        let test=this.http.get<any[]>(this.rootURL + 'panel/getCategory');
        console.log(test);
        return test;
    }
}
