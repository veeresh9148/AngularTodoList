import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filter, from, Observable } from 'rxjs';
import { HttpServicesService } from '../http-services.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css'],
})
export class ItemlistComponent {
  constructor(
    private http: HttpServicesService,
    private toastr: ToastrService
  ) {}
  data;
  taskArray;

  @Input() filterTask;
  ngOnInit() {
    this.http.onTaskList().subscribe((res) => {
      this.data = res;
    });
  }
  onDeleteHandler(id) {
    console.log(id);
    this.http.onDeletedTask(id);
    this.toastr.success('Task is Deleted');
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
}
