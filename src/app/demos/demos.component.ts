import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService, NotificationType } from '../common-services';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'app-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.css']
})
export class DemosComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private name: string = 'Mundo';
  public fecha = '2023-06-08';
  public fontSize = 24;
  public list = [
    {id: 1, name: 'Madrid'},
    {id: 2, name: 'barcelona'},
    {id: 3, name: 'ZARAGOZA'},
    {id: 4, name: 'ciudad real'},
  ];
  public currentState = 3;

  public result?: string;
  public visible = true;
  public aesthetic = { important: true, error: false, urgent: true };

  private subscriptor: Unsubscribable | undefined;

  ngOnInit(): void {
    this.subscriptor = this.vm.Notification.subscribe(n => {
      if (n.Type != NotificationType.error) { return; }
      window.alert(`Suscripción: ${n.Message} `);
      this.vm.remove(this.vm.Notifications.length - 1);
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptor) this.subscriptor.unsubscribe();
  }

  constructor(public vm: NotificationService) { }

  public get Name(): string { return this.name; }
  public set Name(value: string) {
    if (value === this.name) return;
    this.name = value;
  }


  public greet():void {
    this.result = `Hola ${this.Name}`;
  }

  public goodbye():void {
    this.result = `Adiós ${this.Name}`;
  }

  public say(something: string):void {
    this.result = `Dice ${something}`;
  }

  public change():void {
    this.visible = !this.visible;
    this.aesthetic.error = !this.aesthetic.error;
    this.aesthetic.important = !this.aesthetic.important;
  }

  public calc(a: number, b: number): number {
    return a + b;
  }

  public add(state: string):void {
    const id = this.list.length + 1;
    this.list.push({id, name: state});
    this.currentState = id;
  }
}
