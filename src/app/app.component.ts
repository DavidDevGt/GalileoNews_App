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
    
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoidGVzdDVAZ21haWwuY29tIiwiaWF0IjoxNzM2NDcwMzc3LCJleHAiOjE3MzY0NzM5Nzd9.Be0zLbd5iT00-Zk2UE7QCN8CdoCcPP1bjT6UOB2PjKc'
    // this.apiService.getData('api/categorias',token).subscribe(
    //   (response) => {
    //     console.log('Datos recibidos:', response);
    //     this.data = response;
    //   },
    //   (error) => {
    //     console.error('Ocurrió un error:', error);
    //   }
    // );

    // this.apiService.getData('/api/categorias').subscribe(
      // (response) => console.log('GET Response: ', response),
      // (error) => console.log('GET Error: ', error));

  }

}

// Este es un comentario para que David Vargas vea algún cambio