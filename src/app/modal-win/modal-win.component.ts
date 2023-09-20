import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CustomModalService } from '../services/custom-modal.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TAuth, TMarkerForm } from '../services/interfaces/marker.interface';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AuthService } from '../services/auth.service';

export type TMappedFormControls<ValueType> = FormGroup<{
  [Property in keyof ValueType]: FormControl<ValueType[Property]>;
}>;

@Component({
  selector: 'app-modal-win',
  templateUrl: './modal-win.component.html',
  styleUrls: ['./modal-win.component.scss'],
})
export class ModalWinComponent implements OnInit{

  @Input() rate: number;
  @Input() showInfo: boolean;
  @Input() addInfo: boolean;
  @Input() updateInfo: boolean;
  @Input() nameAddress: string;
  @Input() barrierFreeElements: string[];
  @Input() name: string = '';

  checked = true;

  markerForm: TMappedFormControls<TMarkerForm>;
  validateForm: TMappedFormControls<TAuth>;

  ngOnInit() {
    this.markerForm = this.fb.group(
      {
        markerName: this.fb.nonNullable.control(this.name, Validators.required),
        rating: [null as number | null, Validators.required],
        barrierFree: this.fb.nonNullable.control(
          [
            { label: 'Что-то 1', value: 'Chto-to 1', checked: false },
            { label: 'Что-то 2', value: 'Chto-to 2', checked: false },
            { label: 'Что-то 3', value: 'Chto-to 3', checked: false }
          ], Validators.required),
      },
    );
    this.validateForm = this.fb.group(
      {
        userName: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
        password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
      }
    )
    this.setCheckboxStateFromBackendData();
  }


  constructor(private modalService: CustomModalService, private fb: FormBuilder, private modal: NzModalRef, private authService: AuthService) { }

  submitForm(): void {
    const email = this.validateForm.controls.userName.value;
    const password = this.validateForm.controls.password.value;
    if (this.authService.login(email, password)) {
      this.modalService.successAuthMessageModal();
    } else {
      this.modalService.errorAuthMessageModal();
    }
    this.modal.close();
  }

  passDataToService(): void {
    const markerName = this.markerForm.controls.markerName.value;
    const rating = this.markerForm.controls.rating.value;
    const barrierFree = this.markerForm.controls.barrierFree?.value.filter(item => item.checked).map((items) => items.label);
    this.modalService.saveInfoMarker(markerName, rating!, barrierFree);
  }

  private setCheckboxStateFromBackendData() {
    if (this.barrierFreeElements && this.barrierFreeElements.length > 0) {
      const barrierFreeArray = this.markerForm.controls.barrierFree as FormControl<{ label: string; value: string; checked: boolean }[]>;

      this.barrierFreeElements.forEach((item) => {
        const checkbox = barrierFreeArray.value.find((checkboxItem) => checkboxItem.label === item);
        if (checkbox) {
          checkbox.checked = true;
        }
      });

      barrierFreeArray.setValue(barrierFreeArray.value);
    }
  }
}
