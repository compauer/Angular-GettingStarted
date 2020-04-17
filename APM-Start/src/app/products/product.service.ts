import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map, filter, reduce, find } from 'rxjs/operators'

@Injectable({
  providedIn: "root"
})
export class ProductService {

  private productUrl = 'api/products/products.json';

  constructor(private httpClient: HttpClient) {}
  
  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All:' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<IProduct> {
    return this.getProducts()
      .pipe(
        tap(data => console.log(data)),
        map((data: IProduct[]) => data.find(data => data.productId == id))
      )
  }
  
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}