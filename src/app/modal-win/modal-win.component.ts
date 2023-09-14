import { Component, Input} from '@angular/core';
@Component({
  selector: 'app-modal-win',
  templateUrl: './modal-win.component.html',
  styleUrls: ['./modal-win.component.scss'],
})
export class ModalWinComponent{
  @Input() rate: number;
  @Input() showInfo: boolean;
  @Input() addInfo: boolean;
  constructor() {}
}
