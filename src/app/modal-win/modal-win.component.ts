import { Component, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-modal-win',
  templateUrl: './modal-win.component.html',
  styleUrls: ['./modal-win.component.scss'],
})
export class ModalWinComponent {
  @Input() isVisible: boolean = false;
  @Input() nameAddress: string = '';

  constructor(private modalService: NzModalService) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    console.log(this.nameAddress);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    console.log(this.nameAddress);
  }
  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: this.nameAddress,
      nzContent: 'Bla bla ...',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
    });
  }
}
