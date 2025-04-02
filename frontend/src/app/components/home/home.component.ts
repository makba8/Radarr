import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [NavigationBarComponent, SharedModule],
})
export class HomeComponent {
  isSidebarCollapsed = false;
  selectedPage: string = 'home';
  constructor(private authService: AuthService, private router: Router) {}

  movieCards = [
    {
      title: 'Inception',
      description: 'A mind-bending thriller by Christopher Nolan.',
      imageUrl: 'image3.jpg', //à remplacer par une image réelle 
    },
    {
      title: 'The Matrix',
      description: 'A sci-fi classic that questions reality.',
      imageUrl: 'image3.jpg',//à remplacer par une image réelle
    },
    {
      title: 'Interstellar',
      description: 'A journey through space and time.',
      imageUrl: 'image3.jpg',//à remplacer par une image réelle
    },
  ];

  onSidebarToggled(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }
  onPageSelected(pageActive: string) {
    this.selectedPage = pageActive; 
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
