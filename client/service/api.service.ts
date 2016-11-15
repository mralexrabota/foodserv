import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthHttp } from "angular2-jwt";
import { Response } from "@angular/http";
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import "rxjs/add/operator/map";

@Injectable()
export class ApiService {

    constructor(private authHttp: AuthHttp, private http: Http) {
    }

    get(url: string) {
        return this
            .authHttp
            .get(url)
            .map((response: Response) => response.json());
    }

    getRecipes() {
        return this
            .http
            .get('/api/recipe/')
            .map((response: Response) => response.json());
    }

    getRecipe(id: number) {
        return this
            .http
            .get(`/api/recipe/${id}`)
            .map((response: Response) => response.json());
    }

    addRecipe(name: String, description: String):Observable<any> {
        let params = { name, description };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this
            .http
            .put('/api/recipe/', params, options)
            .map((response: Response) => response.json());
    }

    deleteRecipe(id: number):Observable<any> {
        return this
            .http
            .delete(`/api/recipe/${id}`)
            .map((response: Response) => true);
    }

    getGroceries() {
        return this
            .http
            .get('/api/grocery/')
            .map((response: Response) => response.json());
    }

    getGrocery(id: number) {
        return this
            .http
            .get(`/api/grocery/${id}`)
            .map((response: Response) => response.json());
    }

    remGrocery(id: number) {
        return this
            .http
            .get(`/api/grocery/remove/${id}`)
            .map((response: Response) => true);

    }

    updateGrocery(groceries: any) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this
            .http
            .post(`api/grocery/update/${ groceries.id }`, {groceries}, options)
            .map((response: Response) => response.json());

    }

    createGrocery(groceries: any) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this
            .http
            .post(`api/grocery/create`, {groceries}, options)
            .map((response: Response) => response.json());

    }

    search(term: string) {

        return this
            .http
            .get(`/api/grocery/search/${term}`)
            .map((response: Response) => response.json());
    };


}
