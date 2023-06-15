import { Component } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  public user: any = {};
  public mode: 'add' | 'edit' = 'add';

  public add() {
    this.user = {};
    this.mode = 'add';
  }
  public edit() {
    this.user = {
      id: 1,
      name: 'Perico',
      surname: 'Palotes',
      email: 'perico.palotes@mail.com',
      nif: '12345678Z',
      age: 39
    };
    this.mode = 'edit';
  }
  public send() {
    switch(this.mode) {
      case 'add':
        alert(`POST: ${JSON.stringify(this.user)}`);
        break;
      case 'edit':
        alert(`PUT: ${JSON.stringify(this.user)}`);
        break;
    }
  }

  public cancel():void  {
    alert('CANCELLED');
  }
}
