import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentComponent } from './agent.component';
import { ManageIncidentComponent } from './manage-incident/manage-incident.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { IncidentDetailManageComponent } from './incident-detail-manage/incident-detail-manage.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AgentComponent,
    ManageIncidentComponent,
    ControlPanelComponent,
    IndicatorsComponent,
    IncidentDetailManageComponent
  ]
})
export class AgentModule { }
