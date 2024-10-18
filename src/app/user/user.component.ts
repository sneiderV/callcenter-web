import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  showSearchIncident: boolean = false;
  showCreateIncident: boolean = false;
  showMenu: boolean = true;
  showBack: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isActive();
  }

  showCreateIncidentComponent() {
    this.showCreateIncident = true;
    this.showSearchIncident = false;
    this.showMenu = false;
    this.showBack = true;
  }

  showSearchIncidentComponent() {
    this.showCreateIncident = false;
    this.showSearchIncident = true;
    this.showMenu = false;
    this.showBack = true;
  }

  showBackOption() {
    this.showCreateIncident = false;
    this.showSearchIncident = false;
    this.showMenu = true;
    this.showBack = false;
  }

}
