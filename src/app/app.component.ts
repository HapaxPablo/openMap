import { Component } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './services/map.service';
import { MarkerService } from './services/marker.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  leafletOptions: L.MapOptions = this.mapService.mapOpt();
  houseNumber: number;
  road: string;
  nameAddress: string;
  isLoadingMapInit = true;

  constructor(
    private mapService: MapService,
    private markerService: MarkerService
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
}
