import { Component, OnInit } from '@angular/core';
import { Incident } from '../../user/incident';
import { AgentService } from '../agent.service';

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
    private agentService: AgentService
  ) { }

  ngOnInit() {
    
    this.agentService.getIncidents().subscribe(incidents => {
      this.incidentsList = incidents;
    });
  }

  onSelect(incident: Incident): void {
    this.selectedIncident = incident;
    this.showDetail = true;
  }

}
