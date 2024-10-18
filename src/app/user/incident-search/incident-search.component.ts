import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Incident } from '../incident';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-incident-search',
  templateUrl: './incident-search.component.html',
  styleUrls: ['./incident-search.component.css']
})
export class IncidentSearchComponent implements OnInit {

  incidentsList2 !: Incident[]; 
  incidentsList !: Incident[];
  selectedIncident !: Incident;
  showDetail = false;
  

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userService.getIncidentByUser(this.authService.getLoggedUser().id).subscribe(incidents => {
      this.incidentsList = incidents;
      console.log(incidents);
    });
  }

  onSelect(incident: Incident): void {
    this.selectedIncident = incident;
    this.showDetail = true;
  }

}
