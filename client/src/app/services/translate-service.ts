import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class TranslateService {

    data: any = {};
    lang: String = "";
    observableLang: any;
    constructor(private httpClient: HttpClient) { 
        this.observableLang = new BehaviorSubject<any>(this.lang);
    }
    
    use(lang: String): Promise<{}> {
        this.lang = lang;


        return new Promise<{}>((resolve, reject) => {
            const langPath = `assets/i18n/${lang || 'en'}.json`;

            this.httpClient.get<{}>(langPath).subscribe(
                translation => {
                    this.data = Object.assign({}, translation || {});
                    resolve(this.data);
                    this.langChange();
                }, error => {
                    this.data = {};
                    resolve(this.data);
                }
            )
        })
    }

    langChange() {
        this.observableLang.next(this.lang);
    }
}