import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BaseComponentComponent } from '../../components/base-component/base-component.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [IonicModule, BaseComponentComponent, CommonModule],
  standalone: true,
})
export class DashboardComponent {
  enlacesImportantes = [
    { texto: 'Enlace 1', url: 'https://ejemplo.com/enlace1' },
    { texto: 'Enlace 2', url: 'https://ejemplo.com/enlace2' },
    { texto: 'Enlace 3', url: 'https://ejemplo.com/enlace3' },
  ];

  contactosImportantes = [
    { nombre: 'Contacto 1', correo: 'correo1@ejemplo.com', avatar: 'assets/img/contact1.jpg' },
    { nombre: 'Contacto 2', correo: 'correo2@ejemplo.com', avatar: 'assets/img/contact2.jpg' },
    { nombre: 'Contacto 3', correo: 'correo3@ejemplo.com', avatar: 'assets/img/contact3.jpg' },
  ];
}
