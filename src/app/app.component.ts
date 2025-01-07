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

  constructor(private apiService: ApiService) {}

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
  }
}
