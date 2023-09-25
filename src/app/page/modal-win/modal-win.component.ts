import {Component, Input, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import {TMarkerForm} from 'src/app/api/interfaces/marker.interface';
import {CustomModalService} from 'src/app/services/custom-modal.service';

export type TMappedFormControls<ValueType> = FormGroup<{
  [Property in keyof ValueType]: FormControl<ValueType[Property]>;
}>;

@Component({
  selector: 'app-modal-win',
  templateUrl: './modal-win.component.html',
  styleUrls: ['./modal-win.component.scss'],
})
export class ModalWinComponent implements OnInit {
  @Input() rate: number;
  @Input() showInfo: boolean;
  @Input() addInfo: boolean;
  @Input() updateInfo: boolean;
  @Input() nameAddress: string;
  @Input() barrierFreeElements: string[];
  @Input() name: string = '';

  checked = true;

  markerForm: TMappedFormControls<TMarkerForm>;

  ngOnInit() {
    this.markerForm = this.fb.group({
      markerName: this.fb.control(this.name, Validators.required),
      rating: [null as number | null, Validators.required],
      barrierFree: this.fb.control(
        [
          {label: 'Что-то 1', value: 'Chto-to 1', checked: false},
          {label: 'Что-то 2', value: 'Chto-to 2', checked: false},
          {label: 'Что-то 3', value: 'Chto-to 3', checked: false},
        ],
        Validators.required,
      ),
    });
    this.setCheckboxStateFromBackendData();
  }

  constructor(
    private modalService: CustomModalService,
    private fb: NonNullableFormBuilder,
  ) {
  }

  passDataToService(): void {
    const markerName = this.markerForm.controls.markerName.value;
    const rating = this.markerForm.controls.rating.value;
    const barrierFree = this.markerForm.controls.barrierFree?.value
      .filter((item) => item.checked)
      .map((items) => items.label);
    this.modalService.saveInfoMarker(markerName, rating!, barrierFree);
  }

  private setCheckboxStateFromBackendData() {
    if (this.barrierFreeElements && this.barrierFreeElements.length > 0) {
      const barrierFreeArray = this.markerForm.controls
        .barrierFree as FormControl<
        {
          label: string;
          value: string;
          checked: boolean;
        }[]
      >;

      this.barrierFreeElements.forEach((item) => {
        const checkbox = barrierFreeArray.value.find(
          (checkboxItem) => checkboxItem.label === item,
        );
        if (checkbox) {
          checkbox.checked = true;
        }
      });

      barrierFreeArray.setValue(barrierFreeArray.value);
    }
  }
}
