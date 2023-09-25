import { Component } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { finalize, take } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MapService } from 'src/app/services/map.service';
import { MarkerService } from 'src/app/api/services/marker.service';
import { CustomModalService } from 'src/app/services/custom-modal.service';

@UntilDestroy()
@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss'],
})
export class LeafletMapComponent {
  leafletOptions: L.MapOptions = this.mapService.mapOpt();
  houseNumber: number;
  road: string;
  nameAddress: string;
  isLoadingMapInit = true;
  size: NzButtonSize = 'large';

  constructor(
    private mapService: MapService,
    private markerService: MarkerService,
    private modalService: CustomModalService,
  ) {}

  onMapReady(map: L.Map) {
    this.markerService
      .getMarkers()
      .pipe(
        finalize(() => {
          this.isLoadingMapInit = false;
          untilDestroyed(this);
        }),
      )
      .subscribe((markers) => {
        this.mapService.initMap(map);
        markers.forEach((marker) => {
          this.mapService.addMarker(marker);
        });
      });
  }

  onClickMap(event: L.LeafletMouseEvent): void {
    this.subOnInfo(event);
    this.mapService.onMapClick(event);
    this.mapService.getBuildingVertices(event);
  }

  subOnInfo(event: L.LeafletMouseEvent) {
    this.mapService.houseNumber$.pipe(take(1)).subscribe((houseNumber) => {
      this.houseNumber = houseNumber;
    });

    this.mapService.road$.pipe(take(1)).subscribe((road) => {
      this.road = road;
    });
  }

  openAuthModal(): void {
    this.modalService.authModal();
  }
}
