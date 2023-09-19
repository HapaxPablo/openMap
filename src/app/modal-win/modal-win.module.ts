import { NgModule } from '@angular/core';
import { ModalWinComponent } from './modal-win.component';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import {NzFormModule} from "ng-zorro-antd/form";

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

@NgModule({
  declarations: [ModalWinComponent],
  imports: [NzModalModule, FormsModule, BrowserAnimationsModule, NzRateModule, NzInputModule, NzCheckboxModule, ReactiveFormsModule, NzFormModule],
  providers: [
    { provide: NZ_I18N, useValue: ru_RU },
    { provide: NZ_ICONS, useValue: icons },
  ],
  exports: [ModalWinComponent],
  bootstrap: [ModalWinComponent]
})
export class ModalWinModule {}
