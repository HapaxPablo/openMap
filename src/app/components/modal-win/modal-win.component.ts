import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TMappedFormControls } from 'src/app/api/interfaces/maped.interface';
import { TMarkerForm } from 'src/app/api/interfaces/marker.interface';
import { createMarkerBody } from 'src/app/api/interfaces/marker.transformer';
import { MarkerService } from 'src/app/api/services/marker.service';
import { CustomModalService } from 'src/app/services/custom-modal.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-win',
  templateUrl: './modal-win.component.html',
  styleUrls: ['./modal-win.component.scss'],
})
export class ModalWinComponent implements OnInit {
  @Input() rate: number = 0;
  @Input() showInfo: boolean = false;
  @Input() addInfo: boolean = false;
  @Input() updateInfo: boolean = false;
  @Input() nameAddress: string = '';
  @Input() barrierFreeElements: string[] = [];
  @Input() name: string = '';
  @Input() lat: number = 0;
  @Input() long: number = 0;

  checked = true;
  markerName: string = '';
  rating: number = 0;
  barrierFree: string[] = [];

  markerForm!: TMappedFormControls<TMarkerForm>;

  ngOnInit() {
    this.markerForm = this.fb.group({
      markerName: this.fb.control(this.name, Validators.required),
      rating: [this.rating, Validators.required],
      barrierFree: this.fb.control(
        [
          { label: 'Что-то 1', value: 'Chto-to 1', checked: false },
          { label: 'Что-то 2', value: 'Chto-to 2', checked: false },
          { label: 'Что-то 3', value: 'Chto-to 3', checked: false },
        ],
        Validators.required,
      ),
      lat: this.fb.control(this.lat),
      long: this.fb.control(this.long),
      nameAddress: this.fb.control(this.nameAddress),
    });
    this.setCheckboxStateFromBackendData();
  }

  constructor(
    private customModalService: CustomModalService,
    private modalService: ModalService,
    private fb: NonNullableFormBuilder,
    private markerService: MarkerService,
    private modal: NzModalRef,
  ) {}

  passDataToService(): void {
    this.markerName = this.markerForm.controls.markerName.value;
    this.rating = this.markerForm.controls.rating.value;
    this.barrierFree = this.markerForm.controls.barrierFree?.value
      .filter((item) => item.checked)
      .map((items) => items.label);
    this.customModalService.saveInfoMarker(
      this.markerName,
      this.rating,
      this.barrierFree,
    );
  }

  saveMarker() {
    const body = createMarkerBody(this.markerForm.getRawValue());
    this.markerService.createMarker(body).subscribe({
      error: () => {
        this.modalService.errorMessageModal();
      },
      complete: () => {
        this.modal.destroy();
        this.modalService.completeMessageModal();
      },
    });
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
