import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Incident } from '../incident';
import { AuthService } from '../../login/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-incident-create',
  templateUrl: './incident-create.component.html',
  styleUrls: ['./incident-create.component.css']
})
export class IncidentCreateComponent implements OnInit {



  incidentForm !: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.incidentForm = this.formBuilder.group({
      subject: ["", Validators.required],
      description: ["", Validators.required],
     });
  }

  createIncident(incident: Incident) {
    incident.originType = "web";
    incident.userId = this.authService.getLoggedUser().id;
    
    this.userService.createIncident(incident).subscribe(res => {
      this.toastrService.success(`La incidencia fue creada`, "Confirmacion")
      this.incidentForm.reset();
    });
  }

  cancelCreation() {
    this.incidentForm.reset();
  }

}
