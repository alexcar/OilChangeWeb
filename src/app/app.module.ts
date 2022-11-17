import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { LoggerModule } from 'ngx-logger';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    CustomMaterialModule.forRoot(),
    AppRoutingModule,
    LoggerModule.forRoot({
      serverLoggingUrl: `http://my-api/logs`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel
    }),
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
