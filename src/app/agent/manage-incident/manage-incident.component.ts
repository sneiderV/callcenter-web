import { Component, OnInit } from '@angular/core';
import { Incident } from '../../user/incident';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-manage-incident',
  templateUrl: './manage-incident.component.html',
  styleUrls: ['./manage-incident.component.css']
})
export class ManageIncidentComponent implements OnInit {

  incidentsList !: Incident[];
  selectedIncident !: Incident;
  showDetail = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.incidentsList = this.userService.getIncidents();
  }

  onSelect(incident: Incident): void {
    this.selectedIncident = incident;
    this.showDetail = true;
  }

}
