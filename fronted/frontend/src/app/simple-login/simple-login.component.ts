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
  user = { username: '', password: '' };

  // Simula el inicio de sesión
  onSubmit() {
    if (this.user.username && this.user.password) {
      alert(`Bienvenido, ${this.user.username}!`);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  // Simula el registro
  onRegister() {
    alert('Función de registro no implementada.');
  }
}
