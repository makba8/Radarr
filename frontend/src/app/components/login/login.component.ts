import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule], 
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected mail = '';
  protected password = '';

  constructor(private authService: AuthService, private router: Router ) {}


  protected login() {
    const user = { mail: this.mail, password: this.password };

    this.authService.login(user).subscribe({
      
      next: (response) => {
        if (response.accessToken) {
          // Stocke l'Access Token dans localStorage
          localStorage.setItem('accessToken', response.accessToken);
          console.log('Access Token stocké dans localStorage:', response.accessToken);
        }
        this.router.navigate(['']); //redirection vers la home page
        console.log('Connexion réussie!', response);
      },
      error: (error) => {
        console.error('Erreur lors de l’inscription:', error);
        alert('Échec de l’inscription, veuillez réessayer.');
      },
      complete: () => {
        console.log('Requête de connexion terminée.');
      }
    });
  }
}
