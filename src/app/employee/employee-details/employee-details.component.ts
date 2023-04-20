import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Employee, EmployeeEndpointService} from "../../service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee!: Employee;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeEndpointService
  ) {
  }

  ngOnInit(): void {
    this.route.data.forEach((data) => {
      this.employee = data['employee'];
    });
    // console.log(JSON.stringify(this.employee));
  }

  getEmployee(id: number) {
    this.employeeService.restEmployeesIdGet(id, 'response').subscribe({
      next: (response: HttpResponse<Employee>): void => {
          this.employee = response.body!;
        }
      }
    );
  }

}
