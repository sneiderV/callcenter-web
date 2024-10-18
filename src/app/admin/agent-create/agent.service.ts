import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Agent } from './agent';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private apiUrl: string = environment.backendUser;

  constructor(
    private http: HttpClient
  ) { }

  createAgent(newAgent: Agent): Observable<Agent> {
    return this.http.post<Agent>(this.apiUrl, newAgent).pipe(
      catchError(err => throwError(() => new Error("Error con el servicio:" + err.message)))
    );
  }

}
