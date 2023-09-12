import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TCreateMarkerBody, TMarker, TMarkerDTO, createMarkerBody, markerTransformer } from './interfaces/marker.interface';
import { Observable, map } from 'rxjs';
import { MARKER, MARKERS } from './api.const';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  constructor(private _http: HttpClient) { }

  createMarker(data: TCreateMarkerBody): Observable<TMarker>{
    const body = createMarkerBody(data);
    return this._http.post<TMarkerDTO>(MARKERS, body).pipe(map(markerTransformer))
  }

  getMarkers(): Observable<TMarker[]>{
    return this._http.get<TMarkerDTO[]>(MARKERS).pipe(map((groupedMarkers)=>groupedMarkers.map(markerTransformer)))
  }

  getMarkerById(id: number):Observable<TMarker> {
    return this._http.get<TMarkerDTO>(MARKER(id.toString())).pipe(map(markerTransformer))
  }

}
