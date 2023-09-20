import { Injectable } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ModalWinComponent } from '../modal-win/modal-win.component';
import { MarkerService } from './marker.service';
import { TCreateMarkerBody, TPatchMarker } from './interfaces/marker.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomModalService {
  showInfo: boolean = false;
  addInfo: boolean = false;
  updateInfo: boolean = false;

  markerName: string;
  rate: number;
  indeterminateItems: string[];

  constructor(private _modalService: NzModalService, private markerService: MarkerService) { }

  saveInfoMarker(markerName: string, rating: number, indeterminateItems: string[]) {
    this.markerName = markerName;
    this.rate = rating;
    this.indeterminateItems = indeterminateItems;
  }

  MarkerModal(nameAddress: string, lat: number, lng: number): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: nameAddress,
      nzContent: 'Вы действительно хотите добавить организацию?',
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
            this.addInfoMarkerModal(nameAddress, lat, lng)
          },
        },
      ],
    });
  }

  addInfoMarkerModal(nameAddress: string, lat: number, lng: number): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: nameAddress,
      nzContent: ModalWinComponent,
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
          label: 'Сохранить',
          type: 'primary',
          shape: 'round',
          onClick: (modalWinComponent: ModalWinComponent) => {
            modalWinComponent.passDataToService()
            const sendData: TCreateMarkerBody = {
              name: this.markerName,
              location: {
                lat: lat,
                long: lng,
                name_address: nameAddress,
              },
              rate: this.rate,
              barrier_free_elements: this.indeterminateItems
            };
            this.markerService.createMarker(sendData).subscribe({
              error: (error) => {
                this.errorMessageModal();
              },
              complete: () => {
                modal.destroy();
                this.completeMessageModal();
                this.markerName = ''
                this.rate = 0
                this.indeterminateItems = []
              },
            })
          },
        },
      ],
    });
    modal.componentInstance!.addInfo = true;
  }

  completeMessageModal(): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: "Успешно",
      nzContent: "Ваш маркер был успешно добавлен",
      nzFooter: [
        {
          label: 'Закрыть',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            modal.destroy();
          }
        }
      ]
    })
  }

  errorMessageModal(): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: "Ошибка!!!",
      nzContent: "Проверьте что вы заполнили все поля!!!",
      nzFooter: [
        {
          label: 'Закрыть',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            modal.destroy();
          }
        }
      ]
    })
  }

  successAuthMessageModal(): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: "Успешно",
      nzContent: "Вы успешно вошли в аккаунт",
      nzFooter: [
        {
          label: 'Закрыть',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            modal.destroy();
          }
        }
      ]
    })
  }

  errorAuthMessageModal(): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: "Ошибка!!!",
      nzContent: "Войдите в аккаунт!!!",
      nzFooter: [
        {
          label: 'Закрыть',
          shape: 'round',
          type: 'dashed',
          onClick: () => {
            modal.destroy();
          }
        },
        {
          label: 'Войти',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            this.authModal();
            modal.destroy();
          }
        }
      ]
    })
  }

  getInfoMarkerModal(name: string, rate: number, nameAddress: string, barrierFreeElements: string[], _id: string): void {
    const modal: NzModalRef = this._modalService.create({
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

  updateMarkerInfo(name: string, rate: number, barrierFreeElements: string[], _id: string) {
    const modal: NzModalRef = this._modalService.create({
      nzTitle:  name,
      nzContent: ModalWinComponent,
      nzClosable: false,
      nzFooter: [
        {
          label: 'Обновить',
          shape: 'round',
          type: 'primary',
          onClick: (modalWinComponent: ModalWinComponent) => {
            modalWinComponent.passDataToService()
            const sendData: TPatchMarker = {
              _id: _id,
              name: this.markerName,
              rate: this.rate,
              barrier_free_elements: this.indeterminateItems
            };
            this.markerService.patchMarkerById(_id, sendData).subscribe({
              error: (error) => {
                this.errorMessageModal();
              },
              complete: () => {
                modal.destroy();
                this.completeMessageModal();
              },
            })
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
    const modal: NzModalRef = this._modalService.create({
      nzTitle: 'Авторизация',
      nzContent: ModalWinComponent,
      nzFooter: [
        {
          label: 'Отмена',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            modal.destroy();
          }
        }
      ]
    })
  }
}
