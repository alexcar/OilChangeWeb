import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export interface IRepositoryBase<T> {
  getAll(headers: HttpHeaders): Observable<T[] | undefined>;
  getById(id: string, headers: HttpHeaders): Observable<T> | undefined;
  create(entity: T, headers: HttpHeaders): Observable<T>;
  update(id: string, entity: T, headers: HttpHeaders): Observable<T>;
  delete(id: string, headers: HttpHeaders): Observable<boolean>;
}
