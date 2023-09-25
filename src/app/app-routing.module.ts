import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeafletMapComponent } from './page/leaflet-map/leaflet-map.component';

const routes: Routes = [
  { path: 'home', component: LeafletMapComponent },
  {
    path: 'about',
    loadChildren: () =>
      import('./page/about-page/about-page.module').then(
        (m) => m.AboutPageModule,
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
