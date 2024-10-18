import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AgentCreateComponent } from './agent-create/agent-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlanComponent } from './plan/plan.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    AdminComponent, 
    AgentCreateComponent,
    PlanComponent],
  exports: [AdminComponent]
})
export class AdminModule { }
