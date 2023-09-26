import {Injectable} from '@angular/core';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {MarkerService} from '../api/services/marker.service';
import {TPatchMarkerBody} from '../api/interfaces/marker.interface';
import {AuthModalComponent} from '../page/auth-modal/auth-modal.component';
import {UntilDestroy} from '@ngneat/until-destroy';
import {ModalWinComponent} from '../components/modal-win/modal-win.component';
import {ModalService} from './modal.service';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class CustomModalService {
  showInfo: boolean = false;
  addInfo: boolean = false;
  updateInfo: boolean = false;
  logInModal: boolean = false;

  markerName: string = '';
  rate: number = 0;
  indeterminateItems: string[] = [];

  constructor(
    private _nzModalService: NzModalService,
    private markerService: MarkerService,
    private _modalService: ModalService,
  ) {
  }

  saveInfoMarker(
    markerName: string,
    rating: number,
    indeterminateItems: string[],
  ) {
    this.markerName = markerName;
    this.rate = rating;
    this.indeterminateItems = indeterminateItems;
  }

  openMarkerModal(nameAddress: string, lat: number, lng: number): void {
    const modal: NzModalRef = this._nzModalService.create({
      nzTitle: nameAddress,
      nzContent: 'Вы действительно хотите заполнить маркер?',
      nzFooter: [
        {
          label: 'Отменить',
          shape: 'round',
          onClick: () => {
            modal.destroy();
            nameAddress = '';
          },
        },
        {
          label: 'Добавить',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            modal.destroy();
            this.addInfoMarkerModal(nameAddress, lat, lng);
          },
        },
      ],
    });
  }

  addInfoMarkerModal(nameAddress: string, lat: number, lng: number): void {
    const modal: NzModalRef = this._nzModalService.create({
      nzTitle: nameAddress,
      nzContent: ModalWinComponent,
      nzFooter: null,
    });
    modal.componentInstance!.addInfo = true;
    modal.componentInstance!.lat = lat;
    modal.componentInstance!.long = lng;
    modal.componentInstance!.nameAddress = nameAddress;
  }

  successAuthMessageModal(): void {
    const modal: NzModalRef = this._nzModalService.create({
      nzTitle: 'Успешно',
      nzContent: 'Вы успешно вошли в аккаунт',
      nzFooter: [
        {
          label: 'Закрыть',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
  }

  errorAuthMessageModal(): void {
    const modal: NzModalRef = this._nzModalService.create({
      nzTitle: 'Ошибка!!!',
      nzContent: 'Войдите в аккаунт!!!',
      nzFooter: [
        {
          label: 'Закрыть',
          shape: 'round',
          type: 'dashed',
          onClick: () => {
            modal.destroy();
          },
        },
        {
          label: 'Войти',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            this.authModal();
            modal.destroy();
          },
        },
      ],
    });
  }

  getInfoMarkerModal(
    name: string,
    rate: number,
    nameAddress: string,
    barrierFreeElements: string[],
    _id: string,
  ): void {
    const modal: NzModalRef = this._nzModalService.create({
      nzTitle: name,
      nzContent: ModalWinComponent,
      nzClosable: false,
      nzFooter: [
        {
          label: 'Изменить',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            modal.destroy();
            this.updateMarkerInfo(name, rate, barrierFreeElements, _id);
          },
        },
        {
          label: 'Закрыть',
          shape: 'round',
          type: 'dashed',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
    modal.componentInstance!.barrierFreeElements = barrierFreeElements;
    modal.componentInstance!.rate = rate;
    modal.componentInstance!.nameAddress = nameAddress;
    modal.componentInstance!.showInfo = true;
  }

  updateMarkerInfo(
    name: string,
    rate: number,
    barrierFreeElements: string[],
    _id: string,
  ) {
    const modal: NzModalRef = this._nzModalService.create({
      nzTitle: name,
      nzContent: ModalWinComponent,
      nzClosable: false,
      nzFooter: [
        {
          label: 'Обновить',
          shape: 'round',
          type: 'primary',
          onClick: (modalWinComponent: ModalWinComponent) => {
            modalWinComponent.passDataToService();
            const sendData: TPatchMarkerBody = {
              _id: _id,
              name: this.markerName,
              rate: this.rate,
              barrierFreeElements: this.indeterminateItems,
            };
            this.markerService.patchMarkerById(_id, sendData).subscribe({
              error: () => {
                this._modalService.errorMessageModal();
              },
              complete: () => {
                modal.destroy();
                this._modalService.completeMessageModal();
              },
            });
          },
        },
        {
          label: 'Закрыть',
          shape: 'round',
          type: 'dashed',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
    modal.componentInstance!.barrierFreeElements = barrierFreeElements;
    modal.componentInstance!.rate = rate;
    modal.componentInstance!.updateInfo = true;
    modal.componentInstance!.name = name;
  }

  authModal() {
    const modal: NzModalRef = this._nzModalService.create({
      nzTitle: 'Авторизация',
      nzContent: AuthModalComponent,
      nzFooter: [
        {
          label: 'Отмена',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
  }
}
