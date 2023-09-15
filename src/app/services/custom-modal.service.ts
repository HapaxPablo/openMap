import { Injectable } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ModalWinComponent } from '../modal-win/modal-win.component';
import { MarkerService } from './marker.service';
import { TCreateMarkerBody } from './interfaces/marker.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomModalService {
  showInfo: boolean = false;
  addInfo: boolean = false;

  markerName: string | null;
  rate: number | null;
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
                console.log(sendData)
                this.markerName = null
                this.rate = null
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

  errorMessageModal(): void{
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

  getInfoMarkerModal(name: string, rate: number, nameAddress: string, barrierFreeElements: string[]): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: name,
      nzContent: ModalWinComponent,
      nzClosable: false,
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
    modal.componentInstance!.barrierFreeElements = barrierFreeElements;
    modal.componentInstance!.rate = rate;
    modal.componentInstance!.nameAddress = nameAddress;
    modal.componentInstance!.showInfo = true;
  }
}
