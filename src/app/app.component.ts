import { Component } from '@angular/core';
import { LoggerService } from 'src/lib/art-and-doc-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Aprendiendo Angular';
  constructor(log: LoggerService) {
    log.error('Error')
    log.warn('Warning')
    log.info('Information')
    log.log('Logline')
  }
}
