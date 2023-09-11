import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TCreateMarkerBody, TMarker, TMarkerDTO, createMarkerBody, markerTransformer } from './interfaces/marker.interface';
import { Observable, map } from 'rxjs';
import { MARKER } from './api.const';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  constructor(private _http: HttpClient) { }

  createMarker(data: TCreateMarkerBody): Observable<TMarker>{
    const body = createMarkerBody(data);
    return this._http.post<TMarkerDTO>(MARKER, body).pipe(map(markerTransformer))
  }

}
