import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'
import { catchError } from 'rxjs/operators';


import { Data } from './data';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
    url = "http://localhost:3001/users";
    tempUrl = "http://localhost:3001/usersDelete"
    constructor(private httpClient:HttpClient,private http:Http) { }
   
    getDataWithPromise(): Promise<any> {
        return this.http.get(this.url).toPromise()
	    .then(this.extractData)
	    .catch(this.handleErrorPromise);
    }

   sendPostRequest(data: any): Observable<any> {
  
    return this.httpClient.post<any>(this.url, data);
   }
   sendupdateRequest(data: any): Observable<any> {
   const  apiURL = `${this.url}/${data.id}`;
    return this.httpClient.post<any>(apiURL, data);
   }

   deleteTabledata(data: any): Observable<any> {
    const  apiURL = `${this.tempUrl}/${data.id}`;
     return this.httpClient.post<any>(apiURL, data);
    }
    private extractData(res: Response) {
   	let body = res.json();
        return body;      
    }
  
    private handleErrorPromise (error: Response | any) {
	console.error(error.message || error);
	return Promise.reject(error.message || error);
    }	
} 