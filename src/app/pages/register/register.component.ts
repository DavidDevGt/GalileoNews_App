import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { AuthTokenService } from 'src/app/services/auth-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule, CommonModule],
})

export class RegisterComponent implements OnInit {

  constructor(private apiService: ApiService, private authTokenService: AuthTokenService, private router: Router) { }
  // Valores del formulario
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  //Validaciones de campos
  matchPassword: boolean = false;
  userValid: boolean = false;
  emailValid: boolean = false;
  passwordValid: boolean = false;

  //Validaciones de foco para manejo de errores en pantalla
  userTouched: boolean = false;
  emailTouched: boolean = false;
  passwordTouched: boolean = false;
  confirmPasswordTouched: boolean = false;


  //Validaciones REGEX
  private userRegex: RegExp = /^[a-zA-Z0-9_]{7,15}$/  //No permite (@, -, .), minLength 7, maxLength 15
  private emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  //Formato de email valido
  private passRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/  //minLength 8, minusc, mayusc

  // No permitir ingreso de caracteres en username
  stopSymbolUser(event: KeyboardEvent): void {
    this.username = this.username.toLowerCase()
    // Limitar entrada de signos en el teclado
    if (event.key === '.' || event.key == '-' || event.key == ' ' || event.key == '@') {
      event.preventDefault();
    }
  }

  //Validar username
  validateUsername(): void {
    this.userTouched = true;
    this.userValid = this.userRegex.test(this.username)
  }

  //Validacion de correo electronico
  validateEmail(): void {
    this.emailTouched = true;
    this.emailValid = this.emailRegex.test(this.email);
  }

  // Validación de la contraseña
  validatePassword(): void {
    this.passwordTouched = true;
    this.passwordValid = this.passRegex.test(this.password);
  }

  // Validacion de que las contraseñas coincidan exactamente
  validateMatchPass(): void {
    this.confirmPasswordTouched = true;
    this.matchPassword = this.password === this.confirmPassword;
  }

  // Funcionamiento del boton Submit
  onSubmit(form: NgForm): void {
    if (form.valid && this.matchPassword) {
      const dataSend = {
        username: this.username,
        email: this.email,
        password: this.password,
        rol_id: 2
      }

      // Registrar nuevo usuario
      this.apiService.postDataNewUser('auth/register', dataSend).subscribe(
        (response) => {
          this.authTokenService.setToken(response.token)
          alert(response.message)
          this.router.navigate(['/home'])
          console.log(this.authTokenService.getToken());
        },
        (error) => {
          console.error('Error al registrar usuario: ', error);
        }
      );
    } else {
      alert('Error en el formulario')
      console.error('El formulario contiene errores');
    }
  }


  ngOnInit() {
    // Si es necesario, aquí puedes inicializar otras configuraciones.
  }
}
