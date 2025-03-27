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
