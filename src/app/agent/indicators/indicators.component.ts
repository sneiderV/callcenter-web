import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css']
})
export class IndicatorsComponent implements OnInit {

  totalIncidentsOpen: number = 0;
  totalIncidentsClose: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
