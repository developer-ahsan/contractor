import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl = environment.apiUrl;
  public imageUrl = environment.imgUrl;

  constructor(private http: HttpClient) { }

  public get(url, params = null): Observable<any> {
    if (params) {
      return this.http
        .get(this.baseUrl + url, {
          params
        })
        .pipe(
          map(this.handleResponse),
          catchError(this.handleError)
        );
    }
    return this.http.get(this.baseUrl + url).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    );
  }

  public post(url, params): Observable<any> {
    return this.http.post(this.baseUrl + url, params).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    );
  }

  public put(url, params): Observable<any> {
    return this.http.put(this.baseUrl + url, params).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    );
  }

  public delete(url): Observable<any> {
    return this.http.delete(this.baseUrl + url).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    );
  }

  public handleResponse(data) {
    //console.log('server sent this data' + JSON.stringify(data));
    if (
      data &&
      data.status_code &&
      (data.status_code === 401)
    ) {

      window.location.href = "/login";

    }
    return data;
  }

  public handleError(error) {
    return throwError(error);
  }
}
