import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MainModule } from './main';
import { SecurityModule } from './security';

import { ArtAndDocCoreModule } from 'src/lib/art-and-doc-core';


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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
