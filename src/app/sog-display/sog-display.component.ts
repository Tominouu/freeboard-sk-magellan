import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFacade } from '../app.facade';
import { Convert } from '../lib/convert';

@Component({
  selector: 'app-sog-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sog-container">
      SOG: {{ displaySog }}
    </div>
  `,
  styles: [`
    .sog-container {
      position: absolute;
      top: 80px;
      left: 20px;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.6);
      color: #00d2ff;
      padding: 10px;
      border-radius: 5px;
      font-size: 20px;
      font-weight: bold;
      pointer-events: none;
      user-select: none;
    }
  `]
})
export class SogDisplayComponent {

  constructor(public app: AppFacade) {}

  // Cette méthode calcule la valeur à la volée sans bloquer l'application
  get displaySog(): string {
    // Vérification de sécurité : si les données ne sont pas encore là
    if (!this.app.data || !this.app.data.vessels.self) {
      return '--';
    }

    const sog = this.app.data.vessels.self.sog;

    // Si la vitesse est nulle ou indéfinie
    if (sog === null || sog === undefined) {
      return '--';
    }

    // Récupération de l'unité préférée dans la config
    const unit = this.app.config.units.speed;
    let value = 0;
    let label = '';

    // Conversion locale pour éviter d'appeler app.formatSpeed() qui cause l'erreur
    switch (unit) {
      case 'kn':
        value = Convert.msecToKnots(sog);
        label = 'kn';
        break;
      case 'kmh':
        value = Convert.msecToKmh(sog);
        label = 'km/h';
        break;
      case 'mph':
        value = Convert.msecToMph(sog);
        label = 'mph';
        break;
      default: // m/s
        value = sog;
        label = 'm/s';
    }

    return `${value.toFixed(1)} ${label}`;
  }
}