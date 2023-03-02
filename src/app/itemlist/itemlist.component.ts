import { Component, EventEmitter, Input, Output } from '@angular/core';
import { filter, from, Observable } from 'rxjs';
import { HttpServicesService } from '../http-services.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css'],
})
export class ItemlistComponent {
  constructor(private http: HttpServicesService) {}
  data;
  serviceData;
  taskArray;
  // taskDetails;
  // taskDetails = new Observable();
  @Input() filterTask;
  ngOnInit() {
    this.data = this.http.data;
    this.taskArray = this.http.filteredData;
    // this.http.onTaskList().subscribe((res) => {
    //   if (this.filterTask == 'Completed' || this.filterTask == 'Incompleted') {
    //     this.data = this.http.data.filter((resp) => {
    //       resp.status == this.filterTask;
    //     });
    //   } else {
    //     this.data = res;
    //   }

    console.log(this.data);
    // });
  }
  onDeleteHandler(id) {
    console.log(id);
    this.http.onDeletedTask(id);
    alert('task is deleted');
  }

  @Output() isEditEvent = new EventEmitter<string>();

  onEditHandler(id: string, name: string, date, status) {
    let isHidden = true;
    this.taskArray = { id, name, isHidden, date, status };
    this.isEditEvent.emit(this.taskArray);
  }

  onStatusChange(id) {
    let data = 'Completed';
    this.http.onTaskComplete(id, data);
  }
  onSubmit() {
    this.taskArray = this.http.filteredData;
  }
}
