import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  planForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.planForm = this.formBuilder.group({
      plan: [""],
    });
  }

  savePlan(plan: String) {
    console.info("The plan to created: ", plan)
    this.toastrService.success("Confirmation", "El plan fue actualizado!")
    this.planForm.reset();
  }

}
