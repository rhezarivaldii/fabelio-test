import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UrlServices } from 'app/services/url-services';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ProductService {

    constructor(private httpClient: HttpClient, @Inject(UrlServices) private urlServices: UrlServices) { }

    public getAllRegisteredProducts(): Observable<any> {
        let url = this.urlServices.api + "/product";

        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public getProductById(id: String): Observable<any> {
        let url = this.urlServices.api + "/product/" + id;

        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public submitComment(req): Observable<any> {
        let url = this.urlServices.api + "/comment";

        return this.httpClient.post(url, req).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public upVoteComment(commentId): Observable<any> {
        let url = this.urlServices.api + "/vote/upVote/" + commentId;

        return this.httpClient.post(url, null).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public downVoteComment(commentId): Observable<any> {
        let url = this.urlServices.api + "/vote/downVote/" + commentId;

        return this.httpClient.post(url, null).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }
    private extractData(body: any) {
        return Object.assign(body.data || body);
    }

    private handleError(error: HttpErrorResponse | any) {
        let errMsg: string;
        let errObj: any;

        if (error instanceof HttpErrorResponse) {
            const err = error.message || JSON.stringify(error);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            errObj = error.error.message;
        } else {
            errMsg = error.message ? error.message : error.toString();
            const body = error.message || '';
            errObj = body;
        }

        return throwError(errObj);
    }
}