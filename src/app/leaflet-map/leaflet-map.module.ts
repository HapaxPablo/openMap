import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletMapComponent } from './leaflet-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { ModalWinModule } from '../modal-win/modal-win.module';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LeafletPageRoutingModule } from './leaflet-rouring.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    LeafletModule,
    LeafletDrawModule,
    ModalWinModule,
    NzRateModule,
    FormsModule,
    NzSpinModule,
    NzButtonModule,
    NzIconModule,
    LeafletPageRoutingModule
  ],
  declarations: [LeafletMapComponent],
  exports: [LeafletMapComponent]
})
export class LeafletMapModule { }
