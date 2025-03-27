import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  protected username = '';
  protected mail = '';
  protected password = '';
  protected confirmPassword = '';

  constructor(private authService: AuthService,private router: Router) {}

  protected register() {
    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas!');
      return;
    }

    const user = { username: this.username, mail: this.mail, password: this.password };

    this.authService.register(user).subscribe({
      next: (response) => {
        if (response.accessToken) {
          // Stocke l'Access Token dans localStorage
          localStorage.setItem('accessToken', response.accessToken);
          console.log('Access Token stocké dans localStorage:', response.accessToken);
        }
        console.log('Inscription réussie!', response);
        alert('Inscription réussie! Merci de vous connecter.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erreur lors de l’inscription:', error);
        alert('Échec de l’inscription, veuillez réessayer.');
      },
      complete: () => {
        console.log('Requête d’inscription terminée.');
      }
    });
  }
}
