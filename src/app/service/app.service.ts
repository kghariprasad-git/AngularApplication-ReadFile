import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { catchError } from 'rxjs/operators';


import { Data } from './data';

@Injectable()
export class AppService {
    url = "http://localhost:4200/assets/data/userdata.json";
    constructor(private http:Http) { }
   
    getBooksWithPromise(): Promise<Data[]> {
        return this.http.get(this.url).toPromise()
	    .then(this.extractData)
	    .catch(this.handleErrorPromise);
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