import { Injectable } from '@angular/core';
import { Incident } from './incident';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private incidentApiUrl: string = environment.backendIncidents;

  constructor(
    private http: HttpClient
  ) { }

  createIncident(newIncident: Incident): Observable<Incident> {
    return this.http.post<Incident>(this.incidentApiUrl, newIncident).pipe(
      catchError(err => throwError(() => new Error("Error con el servicio:" + err.message)))
    );
  }

  getIncidentByUser(userId: string): Observable<Incident[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Incident[]>(this.incidentApiUrl , { params }).pipe(
      catchError(err => throwError(() => new Error("Error con el servicio:" + err.message)))
    );
  }

  getIncidents(): Incident[] {
    return [
      {
        id: 1,
        userId: '1',
        subject: 'Subject 1',
        description: 'Description 1',
        status: 'Status 1',
        originType: 'Origin Type 1',
        solution: 'Solution 1',
        creationDate: new Date(),
        updateDate: new Date()
      },
      {
        id: 1,
        userId: '1',
        subject: 'Subject 2',
        description: 'Description 2',
        status: 'Status 2',
        originType: 'Origin Type 2',
        solution: 'Solution 2',
        creationDate: new Date(),
        updateDate: new Date()
      },
      {
        id: 1,
        userId: '1',
        subject: 'Subject 3',
        description: 'Description 3',
        status: 'Status 3',
        originType: 'Origin Type 3',
        solution: 'Solution 3',
        creationDate: new Date(),
        updateDate: new Date()
      }
    ];
  }

}
