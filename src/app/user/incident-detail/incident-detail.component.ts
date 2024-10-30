import { Component, Input, OnInit } from '@angular/core';
import { Incident } from '../incident';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {

  @Input() incidetDetail !: Incident;
  constructor() { }

  ngOnInit() {
    console.log(this.incidetDetail);
  }

}
