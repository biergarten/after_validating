import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, switchMap } from 'rxjs';
import { MembershipApplication } from './application.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  baseUrl = 'https://localhost:7278/';
  constructor(private http: HttpClient) { }

  getApplication(id: string): Observable<MembershipApplication | undefined> {
    return this.http.get<MembershipApplication>(`${this.baseUrl}api/membershipapplication/${id}`);
  }

  getNextApplication(): Observable<MembershipApplication | undefined> {
    return this.getNextApplicationPolling(10000);
  }

  getNextApplicationPolling(pollingInterval: number = 10000): Observable<MembershipApplication | undefined> {
    return this.http.put<MembershipApplication>(`${this.baseUrl}api/membershipapplication/assign/franco`, null)
      .pipe(
        switchMap(response => {
          if (response === null) {
            console.log("Continue polling...");
            return of(null).pipe(delay(pollingInterval));
          }
          else {
            return of(response);
          }
        }),
        catchError(error => {
          return of(error);
        }),
        switchMap(result => result === null ? this.getNextApplicationPolling(pollingInterval) : of(result))
      );
  }


  getAllApplications(): Observable<MembershipApplication[]> {
    return this.http.get<MembershipApplication[]>('api/membershipapplication');
  }


  referApplication(application: Partial<MembershipApplication>): Observable<MembershipApplication> {
    const headers = { headers: { 'Content-Type': 'application/json' } };


    return this.http.put<MembershipApplication>(`${this.baseUrl}api/membershipapplication/${application.id}/refer`, application, headers)

  }

  referToBoard(application: Partial<MembershipApplication>): Observable<MembershipApplication> {
    const headers = { headers: { 'Content-Type': 'application/json' } };


    return this.http.put<MembershipApplication>(`${this.baseUrl}api/membershipapplication/${application.id}/refer-to-board`, application, headers)

  }

  referVoidApplication(application: Partial<MembershipApplication>): Observable<any> {
    const headers = { headers: { 'Content-Type': 'application/json' } };


    return this.http.put<MembershipApplication>(`${this.baseUrl}api/membershipapplication/${application.id}/refer`, application, headers)

  }


}