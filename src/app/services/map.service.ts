import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _map: L.Map | null = null;
  house_number: number | null = null;
  road: string | null = '';

  private houseNumberSubject = new BehaviorSubject<number | null>(null);
  houseNumber$ = this.houseNumberSubject.asObservable();

  private roadSubject = new BehaviorSubject<string | null>('');
  road$ = this.roadSubject.asObservable();

  constructor(private _http: HttpClient) { }

  public mapOpt(): L.MapOptions {
    return {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 12,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
      ],
      zoom: 12,
      center: L.latLng(56.01488, 92.86846)
    };
  }
  public initMap(mapObj: L.Map): void {
    this._map = mapObj;
  }

  public onMapClick(event: L.LeafletMouseEvent): void {
    if (this._map) {
      L.marker(event.latlng).addTo(this._map);
    } else {
      console.error("Map is not initialized.");
    }
  }

  getBuildingVertices(event: L.LeafletMouseEvent) {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&addressdetails=1&polygon_geojson=1&format=geojson`;

    this._http.get(apiUrl)
      .subscribe((data: any) => {
        const buildingGeometry = data.features[0].geometry;
        if (buildingGeometry.type === 'Polygon') {
          const buildingVertices = buildingGeometry.coordinates[0];
          this.highlightBuilding(buildingVertices);
        }
        const address = data.features[0].properties.address;
        if (address) {
          this.house_number = address.house_number;
          this.road = address.road;
          this.houseNumberSubject.next(this.house_number);
          this.roadSubject.next(this.road);
        }
      });
  }

  private highlightBuilding(vertices: number[][]): void {
    if (this._map) {
      const latLngs: L.LatLngExpression[] = vertices.map(vertice => {
        return L.latLng(vertice[1], vertice[0]);
      });

      const buildingPolygon = L.polygon(latLngs).addTo(this._map);

      buildingPolygon.setStyle({
        color: 'black',
        weight: 1,
        fill: false
      });
    } else {
      console.error("Map is not initialized.");
    }
  }
}