import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { catchError, delay, map, mapTo, Observable, of } from "rxjs";
import { ComplexFormValue } from "../models/complex-form-value.model";

@Injectable()
export class ComplexFormService {
  constructor(private http: HttpClient) {}

  saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/users`, formValue).pipe(
      map(() => true),
      delay(1000),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    );
  }
}