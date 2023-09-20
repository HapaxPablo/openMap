import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { take } from 'rxjs';
import { MapService } from '../services/map.service';
import { MarkerService } from '../services/marker.service';
import { CustomModalService } from '../services/custom-modal.service';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent{
  leafletOptions: L.MapOptions = this.mapService.mapOpt();
  houseNumber: number;
  road: string;
  nameAddress: string;
  isLoadingMapInit = true;
  size: NzButtonSize = 'large';

  constructor(
    private mapService: MapService,
    private markerService: MarkerService,
    private modalService: CustomModalService
  ) {}

  onMapReady(map: L.Map) {
    this.markerService.getMarkers().subscribe((markers) => {
      this.mapService.initMap(map);
      markers.forEach((marker) => {
        this.mapService.addMarker(marker);
      });
      this.isLoadingMapInit = false;
    });
  }

  onClickMap(event: L.LeafletMouseEvent): void {
    this.subOnInfo(event);
    this.mapService.onMapClick(event);
    this.mapService.getBuildingVertices(event);
  }

  subOnInfo(event: L.LeafletMouseEvent) {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
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
