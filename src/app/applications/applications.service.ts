import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MembershipApplication } from './application.model';
import { nanoid } from 'nanoid'

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
    return this.http.put<MembershipApplication>(`${this.baseUrl}api/membershipapplication/assign/franco`, null);
  }


  getAllApplications(): Observable<MembershipApplication[]> {
    return this.http.get<MembershipApplication[]>('api/membershipapplication');
  }


  referApplication(application: Partial<MembershipApplication>): Observable<MembershipApplication> {
    const headers = { headers: { 'Content-Type': 'application/json' } };


    return this.http.put<MembershipApplication>(`${this.baseUrl}api/membershipapplication/${application.id}/refer`, application, headers)

  }


}