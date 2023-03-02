import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServicesService {
  constructor(private http: HttpClient) {}
  task1 = [];
  filteredData = [];
  data: any = [];
  filter: string = 'All';

  onPostData(task) {
    this.http
      .post('https://angular-cd569-default-rtdb.firebaseio.com/list.json', task)
      .subscribe((res) => {
        console.log(res);
      });
  }
  // observer = new Observable();
  onTaskList(): Observable<any> {
    // this.observer = this.http
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
        console.log(res);
        console.log('updated');
      });
  }
  // Observer1 = new Observable();
  onStatusFilter(filterData) {
    this.filter = filterData;
    this.data = this.task1;

    if (this.filter == 'Completed' || this.filter == 'Incompleted') {
      this.filteredData = this.task1.filter(
        (resp) => resp.status === filterData
      );
      console.log(this.filteredData);
    } else {
      this.onTaskList().subscribe((res) => {
        this.data = res;
        console.log(this.data);
      });
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
        console.log(res);
        console.log('updated');
      });
  }
}
