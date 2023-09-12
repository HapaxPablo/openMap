import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent
  ],
  imports: [BrowserModule, LeafletModule, HttpClientModule, LeafletDrawModule, BrowserAnimationsModule, MatButtonModule, MatDialogModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
