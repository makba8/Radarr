import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faLeaf, faFire, faFilm } from '@fortawesome/free-solid-svg-icons';
import { IconService } from '../../../services/icon.service';



@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [SharedModule, FontAwesomeModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {
  isCollapsed = false;
  activeButton: string = 'home';

  constructor(private iconService: IconService) {
  }

  // Événement pour informer le parent home.component
  @Output() sidebarToggled = new EventEmitter<boolean>();
  @Output() pageSelected = new EventEmitter<string>();


  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed); // Envoie l'état au parent que la barre est réduite
  }
  selectedIcon: any = null;

  icons: { icon: IconProp }[] = [
    { icon: faLeaf as IconProp },
    { icon: faFire as IconProp },
    { icon: faFilm as IconProp }
  ];
  
  selectIcon(item: any) {
    this.selectedIcon = item;
  }

  setActive(button: string) {
    this.activeButton = button;
    this.pageSelected.emit(this.activeButton);
  }
}
