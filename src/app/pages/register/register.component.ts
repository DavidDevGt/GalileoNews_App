import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [FormsModule],
})

export class RegisterComponent implements OnInit {

  // Valores del formulario
  username: string = '';
  password: string = '';
  email: string = '';
  confirm_password: string = '';
  x: boolean = false;

  // Validacion de entrada de username (No permitir . o -)
  onKeyPress(event: KeyboardEvent): void {
    this.username = this.username.toLowerCase()
    if (event.key === '.' || event.key == '-' || event.key == ' ') {
      event.preventDefault(); // Evita que el carácter "." se agregue al campo
    }
  }

  // Validacion de credenciales (PENDIENTE)
  onKeyPressPass(event: KeyboardEvent): void {
    if(this.password !== this.confirm_password){
      console.log('Las credenciales no coinciden');
    }else{
      console.log('Credenciales identicas');
      this.x = true;
      
    }
  }

  //Valicacion de similitud en credenciales


  //Funcionamiento del Submit
  onSubmit(form: NgForm): void {
    if(form.valid){
        console.log('Formulario valido: ', this.username, this.email, this.password, this.confirm_password, this.x);
    }else{
      console.error('El formulario contiene errores');
      
    }
  }

  constructor() {}

  ngOnInit() {}
}
