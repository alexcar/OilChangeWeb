import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export interface IRepositoryBase<T> {
  getAll(): Observable<T[] | undefined>;
  getById(id: string): Observable<T | undefined>;
  create(entity: T): Observable<T>;
  update(id: string, entity: T): Observable<T>;
  delete(id: string): Observable<boolean>;
}
