import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  TCreateMarkerBody,
  TMarker,
  TMarkerDTO,
  TPatchMarkerBody,
  TPatchMarkerDTO,
} from '../interfaces/marker.interface';
import {catchError, map, Observable, throwError} from 'rxjs';
import {MARKER, MARKERS} from '../const/api.const';
import {Router} from '@angular/router';
import {
  createMarkerBodyDTO,
  markerTransformer,
  patchMarkerBody,
  patchMarkerDTO,
} from '../interfaces/marker.transformer';
import {ModalService} from 'src/app/services/modal.service';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _modalService: ModalService,
  ) {
  }

  createMarker(data: TCreateMarkerBody): Observable<TMarker> {
    const body = createMarkerBodyDTO(data);
    return this._http
      .post<TMarkerDTO>(MARKERS, body)
      .pipe(map(markerTransformer));
  }

  // сделать типа пагинации на бэке, чтобы можно было получать не все (определенное кол-во).
  getMarkers(): Observable<TMarker[]> {
    return this._http.get<TMarkerDTO[]>(MARKERS).pipe(
      map((groupedMarkers) => groupedMarkers.map(markerTransformer)),
      catchError(this._handleError),
    );
  }

  getMarkerById(_id: string): Observable<TMarker> {
    return this._http
      .get<TMarkerDTO>(MARKER(_id.toString()))
      .pipe(map(markerTransformer), catchError(this._handleError));
  }

  patchMarkerById(
    _id: string,
    data: TPatchMarkerBody,
  ): Observable<TPatchMarkerBody> {
    const body = patchMarkerBody(data);
    return this._http
      .patch<TPatchMarkerDTO>(MARKER(_id.toString()), body)
      .pipe(map(patchMarkerDTO));
  }

  private _handleError = (error: HttpErrorResponse) => {
    if (error.status === 400 || error.status === 404) {
      this._router.navigate(['/404']);
    }
    return throwError(() => {
      this._modalService.errorMessageModal();
    });
  };
}
