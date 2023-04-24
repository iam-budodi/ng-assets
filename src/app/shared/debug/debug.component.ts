import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-form-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit{
  @Input() form!: FormGroup;
  @Input() model!: any;

  submittedValue = null;
  isExpanded = false;
  selectedIndex = 0;
  submittedDate = null;

  @ViewChild(MatTabGroup, { static: true }) tabGroup!: MatTabGroup;

  constructor() {}

  ngOnInit() {
    this.isExpanded = sessionStorage.getItem("debug-expanded") === "true";
  }

  onExpandedChange(isExpanded: any) {
    sessionStorage.setItem("debug-expanded", isExpanded);
  }
}
