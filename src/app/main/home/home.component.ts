import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Aprendiendo Angular';
  /* * /
  constructor(private notify: NotificationService) {}
  ngOnInit(): void {
    this.notify.add('Aplicación iniciada.', NotificationType.info);
  }
  /* */
}
