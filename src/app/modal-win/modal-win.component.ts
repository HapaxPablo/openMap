import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CustomModalService } from '../services/custom-modal.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TMarkerForm } from '../services/interfaces/marker.interface';

export type TMappedFormControls<ValueType> = FormGroup<{
  [Property in keyof ValueType]: FormControl<ValueType[Property]>;
}>;

@Component({
  selector: 'app-modal-win',
  templateUrl: './modal-win.component.html',
  styleUrls: ['./modal-win.component.scss'],
})
export class ModalWinComponent {

  @Input() rate: number;
  @Input() showInfo: boolean;
  @Input() addInfo: boolean;
  @Input() updateInfo: boolean;
  @Input() nameAddress: string;
  @Input() barrierFreeElements: string[];
  @Input() name: string;

  checked = true;

  markerForm: TMappedFormControls<TMarkerForm> = this.fb.group(
    {
      markerName: this.fb.nonNullable.control('', Validators.required),
      rating: [null as number | null, Validators.required],
      barrierFree: this.fb.nonNullable.control(
        [
          { label: 'Что-то 1', value: 'Что-то 1', checked: false },
          { label: 'Что-то 2', value: 'Что-то 2', checked: false },
          { label: 'Что-то 3', value: 'Что-то 3', checked: false }
        ], Validators.required),
    },
  );

  

  constructor(private modalService: CustomModalService, private fb: FormBuilder) { }

  passDataToService(): void {
    const markerName = this.markerForm.controls.markerName.value;
    const rating = this.markerForm.controls.rating.value;
    const barrierFree = this.markerForm.controls.barrierFree?.value.filter(item => item.checked).map((item) => item.value);
    this.modalService.saveInfoMarker(markerName, rating!, barrierFree);
  }
}
