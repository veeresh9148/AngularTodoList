import { Component } from '@angular/core';
import { HttpServicesService } from '../http-services.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent {
  constructor(private http: HttpServicesService) {}
  tasklist;
  filteredTask;

  editHandler(taskArray) {
    this.tasklist = taskArray;
  }
  onStatusFilter(value) {
    console.log(value);
    this.filteredTask = value;
  }
}
