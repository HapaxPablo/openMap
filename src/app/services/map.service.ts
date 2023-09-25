import {HttpClient} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import * as L from 'leaflet';
import {TMarker} from '../api/interfaces/marker.interface';
import {CustomModalService} from './custom-modal.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

type TMarkerList = {
  mapMarker: L.Marker;
  businessMarker: TMarker;
};

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class MapService {
  private _map: L.Map;
  private _markerLayer: L.FeatureGroup;
  private _markerList: TMarkerList[] = [];
  private _cursor: L.Marker | null = null;
  house_number: number;
  road: string;
  private nameAddress: string;
  isLoadingMapInit = true;

  constructor(
    private _http: HttpClient,
    private _zone: NgZone,
    private customModal: CustomModalService,
  ) {
  }

  public mapOpt(): L.MapOptions {
    return {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 12,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }),
      ],
      zoom: 12,
      center: L.latLng(56.01488, 92.86846),
    };
  }

  private setCursorCoord(latLng: L.LatLng): void {
    if (!this._cursor) {
      this._cursor = L.marker(latLng);
      this._cursor.addTo(this._map);
    }
    this._cursor.setLatLng(latLng);
    this._map.setView(latLng, this._map.getMaxZoom());
  }

  public initMap(mapObj: L.Map): void {
    this._map = mapObj;
    this._markerLayer = L.featureGroup();
    this._markerLayer.addTo(this._map);
    this.isLoadingMapInit = false;
  }

  public addMarker = (marker: TMarker): void => {
    const addMarker = L.marker(
      L.latLng(marker.location.lat, marker.location.long),
    );
    addMarker.addTo(this._markerLayer);
    addMarker.on('click', () => {
      this._zone.run(() => this.onMarkerClick(marker));
    });

    this._markerList.push({
      mapMarker: addMarker,
      businessMarker: marker,
    });
  };

  getBuildingVertices(event: L.LeafletMouseEvent) {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&addressdetails=1&polygon_geojson=1&format=geojson`;

    this._http
      .get(apiUrl)
      .pipe(untilDestroyed(this))
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
          this.nameAddress = `${this.road}, д. ${this.house_number}`;
          this.customModal.MarkerModal(this.nameAddress, lat, lng);
        }
      });
  }

  public clearLayer() {
    this._markerLayer.clearLayers();
  }

  public onMapClick(event: L.LeafletMouseEvent): void {
    this.setCursorCoord(event.latlng);
    if (this._map) {
      L.marker(event.latlng).addTo(this._map);
    } else {
      console.error('Map is not initialized.');
    }
  }

  public onMarkerClick(marker: TMarker): void {
    this.customModal.getInfoMarkerModal(
      marker.name,
      marker.rate,
      marker.location.name_address,
      marker.barrier_free_elements,
      marker._id,
    );
  }

  private highlightBuilding(vertices: number[][]): void {
    if (this._markerLayer) {
      const latLngs: L.LatLngExpression[] = vertices.map((vertice) => {
        return L.latLng(vertice[1], vertice[0]);
      });

      const buildingPolygon = L.polygon(latLngs).addTo(this._map);

      buildingPolygon.setStyle({
        color: 'black',
        weight: 1,
        fill: false,
      });
    } else {
      console.error('Map is not initialized.');
    }
  }
}
