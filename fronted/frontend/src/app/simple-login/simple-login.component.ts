import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simple-login',
  templateUrl: './simple-login.component.html',
  styleUrls: ['./simple-login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class SimpleLoginComponent {

  constructor() { }

  user = { 
    userId: '',
    username: '', 
    password: '' ,
    email: '',
  };

  // Simula el inicio de sesión
  onSubmit() {
    const id = crypto.randomUUID();
    if (this.user.username && this.user.password) {
      alert(`Bienvenido, ${this.user.username} \n${id.substring(0, 8)}!`);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  // Simula el registro
  onRegister() {
    alert('Función de registro no implementada.');
  }
}
