import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './about-page.component';
import { AboutPageRoutingModule } from './about-rouring.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    AboutPageRoutingModule
  ],
  declarations: [AboutPageComponent],
  exports: [AboutPageComponent]
})
export class AboutPageModule { }
