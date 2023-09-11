import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './services/map.service';
import { MarkerService } from './services/marker.service';
import { TCreateMarkerBody } from './services/interfaces/marker.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  leafletOptions: L.MapOptions = this.mapService.mapOpt();
  houseNumber: number | null = null;
  road: string | null = '';

  constructor(private mapService: MapService, private markerService: MarkerService){}

  ngOnInit(): void {
    this.mapService.houseNumber$.subscribe((houseNumber) => {
      this.houseNumber = houseNumber;
    });

    this.mapService.road$.subscribe((road) => {
      this.road = road;
    });
  }
  
  onMapReady(map: L.Map) {
    this.mapService.initMap(map);
  }

  onClickMap(event: L.LeafletMouseEvent): void {
    this.mapService.onMapClick(event);
    this.mapService.getBuildingVertices(event);
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    const nameAddress = `${this.road}, д. ${this.houseNumber}`
    const sendData: TCreateMarkerBody = {
      name: nameAddress,
      rate: 4,
      lat: lat,
      long: lng,
    }
    this.markerService.createMarker(sendData).subscribe({
      complete: () => {
        console.log(sendData)
      }
    })
  }

}
