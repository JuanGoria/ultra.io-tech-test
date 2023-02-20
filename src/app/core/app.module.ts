import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './components/app/app.component';
import { HeaderCommponent } from './components/header/header.component';
import { environment } from '../../environments/environment.prod';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { NgOptimizedImage } from '@angular/common';
import { UserState } from './store/user.state';

@NgModule({
  declarations: [
    AppComponent,
    HeaderCommponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([UserState]),
    SharedModule,
    NgOptimizedImage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
