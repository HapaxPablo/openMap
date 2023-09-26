import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private _modalService: NzModalService) {}

  errorMessageModal(): void {
    this._modalService.create({
      nzTitle: 'Ошибка!!!',
      nzContent: 'Сервер не отвечает, повторите попытку позже!!!',
      nzFooter: [],
      nzClosable: false,
      nzMaskClosable: false,
    });
  }

  completeMessageModal(): void {
    this._modalService.create({
      nzTitle: 'Успешно',
      nzContent: 'Ваш маркер был успешно добавлен',
    });
  }
}
