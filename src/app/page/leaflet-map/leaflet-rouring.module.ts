import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LeafletMapComponent} from './leaflet-map.component';

const routes: Routes = [{path: '', component: LeafletMapComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeafletPageRoutingModule {
}
