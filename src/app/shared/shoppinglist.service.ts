import { Injectable } from '@angular/core';
import {Message, Shoppingitem, Shoppinglist, Status, Unit, User} from "./shoppinglist";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { catchError , retry } from 'rxjs/operators' ;

@Injectable()
export class ShoppinglistService {

    // api - server url
    private api = 'http://shoppinglist20.s1710456005.student.kwmhgb.at/api';

    constructor(private http: HttpClient) {
    }

    /**
     * return all existing shoppinglists
     */
    getAll():Observable<Array<Shoppinglist>> {
        return this.http.get(`${this.api}/shoppinglists`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    /**
     * get all units of the database to be able to select for it
     */
    getAllUnits():Observable<Array<Unit>>{
        return this.http.get<Array<Unit>>(`${this.api}/itemunits`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    /**
     * returns an existing shoppinglist based on passed id
     * @param id
     */
    getSingle(id: number): Observable<Shoppinglist> {
        return this.http.get<Shoppinglist>(`${this.api}/shoppinglist/${id}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    /**
     * creates a new shoppinglist
     * @param shoppinglist
     */
    create(shoppinglist: Shoppinglist): Observable<Shoppinglist> {
        return this.http.post(`${this.api}/shoppinglist`, shoppinglist)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    /**
     * updates an existing shoppinglist
     * @param shoppinglist
     */
    update(shoppinglist: Shoppinglist): Observable<Shoppinglist> {
        console.log(shoppinglist);
        return this.http.put(`${this.api}/shoppinglist/${shoppinglist.id}`, shoppinglist)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    /**
     * updates an existing shoppinglist
     * @param shoppinglist
     */
    remove(id: number): Observable<Shoppinglist> {
        return this.http.delete(`${this.api}/shoppinglist/${id}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }


    private errorHandler (error: Error | any): Observable<any> {
        return throwError (error);
    }
}
