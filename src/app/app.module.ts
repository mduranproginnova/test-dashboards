import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PentahoDashboardComponent } from './component/pentaho-dashboard/pentaho-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    PentahoDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
