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
  
  constructor(private _modalService: NzModalService, private markerService: MarkerService) { }

  MarkerModal(nameAddress: string, lat: number, lng: number): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: nameAddress,
      nzContent: 'Вы действительно хотите добавить организацию?',
      nzFooter: [
        {
          label: 'Отменить',
          shape: 'round',
          onClick: () => {
            console.log('exit');
            modal.destroy();
            nameAddress = '';
          },
        },
        {
          label: 'Добавить',
          type: 'primary',
          onClick: () => {
            console.log('confirm');
            modal.destroy();
            this.addInfoMarkerModal(nameAddress, lat, lng)
          },
        },
      ],
    });
  }

  addInfoMarkerModal(nameAddress: string, lat: number, lng: number):void{
    const modal: NzModalRef = this._modalService.create({
      nzTitle: nameAddress,
      nzFooter: [
        {
          label: 'Отменить',
          shape: 'round',
          onClick: () => {
            console.log('exit');
            modal.destroy();
            nameAddress = '';
          },
        },
        {
          label: 'Добавить',
          type: 'primary',
          onClick: () => {
            console.log('confirm');
            const sendData: TCreateMarkerBody = {
              name: nameAddress,
              lat: lat,
              long: lng,
              rate: 4,
            };
            this.markerService.createMarker(sendData).subscribe({
              error: (error) => {
                alert(error);
              },
              complete: () => {
                modal.destroy();
              },
            })
          },
        },
      ],
    });
  }

  getInfoMarkerModal(name: string, rate: number): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: name,
      nzContent: ModalWinComponent,
      nzClosable: false,
      nzFooter: [
        {
          label: 'Закрыть',
          shape: 'round',
          onClick: () => {
            console.log('exit');
            modal.destroy();
          },
        },
      ],
    });
    modal.componentInstance!.rate = rate;
    modal.componentInstance!.showInfo = true;
  }
}
