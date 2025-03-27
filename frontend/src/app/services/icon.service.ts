import { Injectable } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLeaf, faFire, faFilm, faHouse, faDesktop, faUser, faBinoculars } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  constructor(private library: FaIconLibrary) {
    console.log('IconService chargé');
    this.library.addIcons(faLeaf, faFire, faFilm, faHouse,
         faDesktop, faUser, faBinoculars);
  }
}