import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MainModule } from './main';
import { SecurityModule } from './security';

import { ArtAndDocCoreModule, LoggerService, LOGGER_VERBOSE_LEVEL } from 'src/lib/art-and-doc-core';
import { environment } from 'src/environments/environment';
import { CommonServicesModule } from './common-services';
import { DemosComponent } from './demos/demos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalcComponent } from './calc/calc.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ContactsModule } from './contacts';


@NgModule({
  declarations: [
    AppComponent,
    DemosComponent,
    DashboardComponent,
    CalcComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MainModule,
    SecurityModule,
    CommonServicesModule,
    AppRoutingModule,
    ArtAndDocCoreModule,
    ContactsModule,

  ],
  providers: [
    LoggerService,
    { provide: LOGGER_VERBOSE_LEVEL, useValue: environment.LOGGER_VERBOSE_LEVEL },
    //{ provide: HTTP_INTERCEPTORS, useClass: AjaxWaitInterceptor, multi: true, },
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
