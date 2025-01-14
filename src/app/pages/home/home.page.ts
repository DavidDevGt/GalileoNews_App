import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { BaseComponentComponent } from '../../components/base-component/base-component.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { AuthTokenService } from 'src/app/services/auth-token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, BaseComponentComponent, CommonModule, FormsModule],
  standalone: true,
})
export class HomePage {
  isDarkMode = false;

  constructor(private router: Router, private apiService: ApiService, private authToken: AuthTokenService) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDark.matches;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  //Valores del formulario
  email: string = '';
  password: string = '';
  //Valor REGEX para email
  private emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  //Formato de email valido
  //Valores para validacion de campos
  emailValid: boolean = false;
  passwordValid: boolean = false;
  submitted: boolean = false;

  // Evento de SUBMIT
  onSubmit(form: NgForm): void {
    this.submitted = true;
    this.emailValid = this.emailRegex.test(this.email)

    if (form.valid && this.emailValid) {
      // Crear modelo para enviar datos
      const dataSend = {
        email: this.email,
        password: this.password
      }

      console.log(this.authToken.getToken());
      
      this.apiService.postData('auth/login',this.authToken.getToken()).subscribe(
        (response)=>{console.log('Respuesta del servidor: ', response);
        },
        (error) => { console.error('Error en la peticion: ', error);
        }
      )
    }

    // if (this.emailValid) {
    //   console.log(this.authToken.getToken());
    // 
  }
}
