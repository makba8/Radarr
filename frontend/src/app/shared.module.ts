// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Pour les deux-way bindings [(ngModel)]
import { RouterModule } from '@angular/router';  // Pour les routes et routerLink
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatInputModule} from '@angular/material/input';
import { IconService } from './services/icon.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,  // Permet d'effectuer des requêtes HTTP
    FormsModule,       // Pour les formulaires et ngModel
    RouterModule,      // Pour la gestion des routes et routerLink
    FontAwesomeModule ,
    MatInputModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
  ],
  providers: [IconService],
})
export class SharedModule {}
