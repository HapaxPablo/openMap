import { NgModule } from '@angular/core';
import { ModalWinComponent } from './modal-win.component';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

@NgModule({
  declarations: [ModalWinComponent],
  imports: [BrowserModule, NzModalModule, FormsModule, BrowserAnimationsModule, NzRateModule],
  providers: [
    { provide: NZ_I18N, useValue: ru_RU },
    { provide: NZ_ICONS, useValue: icons },
  ],
  exports: [ModalWinComponent],
  bootstrap: [ModalWinComponent]
})
export class ModalWinModule {}
