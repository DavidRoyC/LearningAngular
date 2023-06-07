import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MainModule } from './main';
import { SecurityModule } from './security';

import { ArtAndDocCoreModule, LoggerService, LOGGER_VERBOSE_LEVEL } from 'src/lib/art-and-doc-core';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MainModule,
    SecurityModule,
    AppRoutingModule,
    ArtAndDocCoreModule,

  ],
  providers: [
    LoggerService,
    { provide: LOGGER_VERBOSE_LEVEL, useValue: environment.LOGGER_VERBOSE_LEVEL }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
