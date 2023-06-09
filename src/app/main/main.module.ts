import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';



@NgModule({
  declarations: [
    HomeComponent,
    NotificationComponent,
    NotificationModalComponent,

  ],
  exports: [
    HomeComponent,
    NotificationComponent,
    NotificationModalComponent,

  ],
  imports: [
    CommonModule
  ]
})

export class MainModule {
  constructor( @Optional() @SkipSelf() parentModule: MainModule) {
    if (parentModule) {
      const msg = `MainModule has already been loaded.
        Import Main once, only, in the root AppModule.`;
      throw new Error(msg);
    }
  }
}
