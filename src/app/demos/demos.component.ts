import { Component } from '@angular/core';
import { NotificationService } from '../common-services';

@Component({
  selector: 'app-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.css']
})
export class DemosComponent {
  constructor(public vm: NotificationService) { }
}
