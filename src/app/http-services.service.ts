import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServicesService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  task1 = [];

  data;
  filter: string = 'All';

  onPostData(task) {
    this.http
      .post('https://angular-cd569-default-rtdb.firebaseio.com/list.json', task)
      .subscribe((res) => {
        console.log(res);
      });
  }

  onTaskList(): Observable<any> {
    return this.http
      .get('https://angular-cd569-default-rtdb.firebaseio.com/list.json')
      .pipe(
        map((res) => {
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              this.task1.push({ ...res[key], id: key });
            }
          }
          return this.task1;
        })
      );
  }
  onDeletedTask(id: string) {
    this.http
      .delete(
        'https://angular-cd569-default-rtdb.firebaseio.com/list/' + id + '.json'
      )
      .subscribe();
  }

  onTaskEdit(id, data) {
    this.http
      .patch(
        'https://angular-cd569-default-rtdb.firebaseio.com/list/' +
          id +
          '.json',
        { task: data }
      )
      .subscribe((res) => {
        this.toastr.success('Task is Updated');
      });
  }

  onStatusFilter(filterData) {
    this.filter = filterData;
    if (this.filter == 'Completed' || this.filter == 'Incompleted') {
      this.data = this.task1.filter((resp) => resp.status === filterData);
    } else if (this.filter == 'All') {
      this.data = this.task1;
    }
  }
  onTaskComplete(id, data) {
    this.http
      .patch(
        'https://angular-cd569-default-rtdb.firebaseio.com/list/' +
          id +
          '.json',
        { status: data }
      )
      .subscribe((res) => {
        this.toastr.success('Task is Completed');
      });
  }
}
