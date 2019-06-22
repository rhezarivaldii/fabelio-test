import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UrlServices } from "app/services/url-services";
import { throwError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Request } from "./landing.model";

@Injectable({ providedIn: "root" })
export class LandingService {
  constructor(
    private httpClient: HttpClient,
    @Inject(UrlServices) private urlServices: UrlServices
  ) {}

  public addProduct(_body: Request): Observable<any> {
    let url = this.urlServices.api + '/product';

    return this.httpClient.post(url, _body).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(body: any) {
    return Object.assign(body.data || body);
  }

  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    let errObj: any;

    if (error instanceof HttpErrorResponse) {
      const err = error.message || JSON.stringify(error);
      errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
      errObj = error.error.message;
    } else {
      errMsg = error.message ? error.message : error.toString();
      const body = error.message || "";
      errObj = body;
    }

    return throwError(errObj);
  }
}
