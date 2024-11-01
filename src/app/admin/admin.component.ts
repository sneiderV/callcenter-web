import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  showPlan: boolean = false;
  showCreateAgent: boolean = false;
  showBack: boolean = false;
  showMenu: boolean = true;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isActive();
  }

  showPlanComponent() {
    this.showPlan = true;
    this.showBack = true;
    this.showCreateAgent = false;
    this.showMenu = false
  }

  showCreateAgentComponent() {
    this.showPlan = false;
    this.showBack = true;
    this.showCreateAgent = true;
    this.showMenu = false;
  }

  showBackOption() {
    this.showPlan = false;
    this.showCreateAgent = false;
    this.showBack = false;
    this.showMenu = true;
  }

}
