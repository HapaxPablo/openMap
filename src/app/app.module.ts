import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalWinModule } from './modal-win/modal-win.module';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LeafletModule,
    HttpClientModule,
    LeafletDrawModule,
    BrowserAnimationsModule,
    ModalWinModule,
    NzRateModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
