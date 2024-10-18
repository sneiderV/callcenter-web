import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  showManageIncident: boolean = false;
  showControlPanel: boolean = false;
  showIndicators: boolean = false;
  showMenu: boolean = true;
  showBack: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isActive();
  }

  showManageIncidentComponent() {
    this.showManageIncident = true;
    this.showControlPanel = false;
    this.showIndicators = false;
    this.showMenu = false;
    this.showBack = true;
  }

  showControlPanelComponent() {
    this.showManageIncident = false;
    this.showControlPanel = true;
    this.showIndicators = false;
    this.showMenu = false;
    this.showBack = true;
  }

  showIndicatorsComponent() {
    this.showManageIncident = false;
    this.showControlPanel = false;
    this.showIndicators = true;
    this.showMenu = false;
    this.showBack = true;
  }

  showBackOption() {  
    this.showManageIncident = false;
    this.showControlPanel = false;
    this.showIndicators = false;
    this.showMenu = true;
    this.showBack = false;
  }

}
