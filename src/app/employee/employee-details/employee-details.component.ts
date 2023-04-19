import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee!: any;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.employee = this.employeeService.getEmployee(+params['id'])!;
    });
  }

}
