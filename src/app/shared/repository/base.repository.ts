import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, retry, throwError } from "rxjs";

import { IRepositoryBase } from './ibase.repository';
import { environment } from "src/environments/environment";

export abstract class RepositoryBase<T> implements IRepositoryBase<T> {

  constructor(protected http: HttpClient, protected route: string) {}

  getAll(headers: HttpHeaders): Observable<T[] | undefined>  {
    // return this.http.get<T[]>(this.createCompleteRoute(this.route, environment.urlAddress),
    //   {headers: new HttpHeaders(headers)});

    const url = this.createCompleteRoute(this.route);

    return this.sendRequest("GET", url, headers);
  }

  getById(id: string, headers: HttpHeaders): Observable<T> | undefined {
    // return this.http.get<T>(this.createCompleteRoute(this.route, environment.urlAddress),
    //   {headers: new HttpHeaders(headers)});

    const url = this.createCompleteRoute(`${this.route}/${id}`);

    return this.sendRequest("GET", url, headers);
  }

  create(entity: T, headers: HttpHeaders): Observable<T> {
    // return this.http.post<T>(this.createCompleteRoute(this.route, environment.urlAddress), entity,
    //   {headers: new HttpHeaders(headers)});

    const url = this.createCompleteRoute(this.route);

    return this.sendRequest("POST", url, headers, entity);
  }

  update(id: string, entity: T, headers: HttpHeaders): Observable<T> {
    // return this.http.put<T>(this.createCompleteRoute(this.route, environment.urlAddress), entity,
    //   {headers: new HttpHeaders(headers)});

    const url = this.createCompleteRoute(`${this.route}/${id}`);

    return this.sendRequest("PUT", url, headers, entity);
  }

  delete(id: string, headers: HttpHeaders): Observable<boolean> {
    // return this.http.delete<boolean>(this.createCompleteRoute(this.route, environment.urlAddress),
    //   {headers: new HttpHeaders(headers)});

    const url = this.createCompleteRoute(`${this.route}/${id}`);

    return this.sendRequest("DELETE", url, headers);
  }

  private createCompleteRoute = (route: string) => {
    return `${environment.urlAddress}/${route}`;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "Unknown error!";

    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status} Message: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage))
  }

  private sendRequest<T>(verb: string, url: string, myHeaders: HttpHeaders, body?: T) : Observable<T> {
    // let myHeaders = new HttpHeaders();
    // myHeaders = myHeaders.set("Access-Key", "<secret>");
    // myHeaders = myHeaders.set("Application-Names", ["exampleApp", "proAngular"]);

    // return this.http.request<T>(verb, url, {
    //   body: body,
    //   headers: myHeaders
    // }).pipe(retry(3), catchError((error: Response) => {
    //   throw(`Network Error: ${error.statusText} (${error.status})`)
    // }));

    return this.http.request<T>(verb, url, {
      body: body,
      headers: myHeaders
    }).pipe(retry(3), catchError(this.handleError));
  }
}
