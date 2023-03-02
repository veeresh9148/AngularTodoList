import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HttpServicesService } from '../http-services.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css'],
})
export class AdditemComponent {
  constructor(private httpConnect: HttpServicesService) {
    // console.log(this.taskList);
  }
  @Input() taskList;
  taskValue;
  taskName;
  onAddClickHandler(task: string) {
    const curDate = new Date();
    var cValue = formatDate(curDate, 'yyyy-MM-dd', 'en-US');
    console.log(cValue);
    let status = 'Incompleted';

    //stored in one object
    let details = {
      task,
      cValue,
      status,
    };
    if (!task) {
      alert('Please enter task name');
    } else {
      this.httpConnect.onPostData(details);
      alert('data is added');
    }
  }
  onEditClickHandler(id: string) {
    let name = this.taskList.name;
    // let object = {
    //   name,
    // };
    console.log(this.taskValue);
    this.httpConnect.onTaskEdit(id, name);
    alert('Data is Updated');
  }
}
