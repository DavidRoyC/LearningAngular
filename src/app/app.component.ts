import { Component, OnInit } from '@angular/core';
//import { LoggerService } from 'src/lib/art-and-doc-core';
import { NotificationService, NotificationType } from './common-services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//export class AppComponent implements OnInit {
export class AppComponent {
  title = 'Aprendiendo Angular';
  /*
  constructor(log: LoggerService) {
    log.error('Error')
    log.warn('Warning')
    log.info('Information')
    log.log('Logline')
  }
  */

  /* * /
  constructor(private notify: NotificationService) {}
  ngOnInit(): void {
    this.notify.add('Aplicación iniciada.', NotificationType.info);
  }
  /* */
}
