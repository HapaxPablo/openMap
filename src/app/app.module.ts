import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutPageModule } from './about-page/about-page.module';
import { AppRoutingModule } from './app-routing.module';
import { LeafletMapModule } from './leaflet-map/leaflet-map.module';
import { LeafletPageRoutingModule } from './leaflet-map/leaflet-rouring.module';
import { CommonModule } from '@angular/common';
import { AboutPageRoutingModule } from './about-page/about-rouring.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModalModule } from './auth-modal/auth-modal.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AboutPageModule,
    AppRoutingModule,
    LeafletMapModule,
    LeafletPageRoutingModule,
    AboutPageRoutingModule,    
    HttpClientModule,
    AuthModalModule
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule { }
