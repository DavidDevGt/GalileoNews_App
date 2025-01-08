import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, HttpClientModule, NavbarComponent],
  standalone: true,
})
export class AppComponent {
  data: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // Llamada GET de ejemplo
    this.apiService.getData('').subscribe(
      (response) => {
        console.log('Datos recibidos:', response);
        this.data = response;
      },
      (error) => {
        console.error('Ocurrió un error:', error);
      }
    );

    // this.apiService.getData('/api/categorias').subscribe(
      // (response) => console.log('GET Response: ', response),
      // (error) => console.log('GET Error: ', error));

  }

}

// Este es un comentario para que David Vargas vea algún cambio