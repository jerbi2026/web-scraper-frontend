import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { VisualiserComponent } from './visualiser/visualiser.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VisualiserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    CommonModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
