import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Agent } from './agent';
import { ToastrService } from 'ngx-toastr';
import { AgentService } from './agent.service';


@Component({
  selector: 'app-agent-create',
  templateUrl: './agent-create.component.html',
  styleUrls: ['./agent-create.component.css']
})
export class AgentCreateComponent implements OnInit {

  agentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private agentService: AgentService
  ) { }

  ngOnInit() {
    this.agentForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      dni: ["", Validators.required],
      fullName: ["", Validators.required],
      phoneNumber: ["", Validators.required]
    });
  }

  createAgent(agent: Agent) {
    agent.role = "agent";
    this.agentService.createAgent(agent).subscribe(res=>{
      this.toastrService.success(`El agente ${agent.username} fue creado!`, "Confirmacion");
      this.agentForm.reset();
    });    
  }

  cancelCreation() {
    this.agentForm.reset();
  }
}
