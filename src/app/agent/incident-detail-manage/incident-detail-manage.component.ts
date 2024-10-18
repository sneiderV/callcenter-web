import { Component, Input, OnInit } from '@angular/core';
import { Incident } from '../../user/incident';

@Component({
  selector: 'app-incident-detail-manage',
  templateUrl: './incident-detail-manage.component.html',
  styleUrls: ['./incident-detail-manage.component.css']
})
export class IncidentDetailManageComponent implements OnInit {

  @Input() incidentDetail !: Incident;

  constructor() { }

  ngOnInit() {
  }

}
