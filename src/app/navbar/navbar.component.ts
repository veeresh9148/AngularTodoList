import { Component, EventEmitter, Output } from '@angular/core';
import { HttpServicesService } from '../http-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private http: HttpServicesService) {}
  // filterStatus;
  @Output() selectedValue = new EventEmitter<string>();
  selectedOption(value) {
    // this.filterStatus = value;
    this.http.onStatusFilter(value);
    this.selectedValue.emit(this.http.data);
  }
  ngOnInit() {
    this.selectedOption('All');
    // this.http.onStatusFilter(this.filterStatus);
    // this.http.Observer1.subscribe();
  }
}
