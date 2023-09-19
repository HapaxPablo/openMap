import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent{
  constructor(private router: Router) {
    const body = document.querySelector('body');
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        body?.scroll(0,0);
      }
    });
  }
  
}
