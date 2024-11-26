import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class UserFormComponent {
  user = { email: '', username: '', password: '' };

  // Simula el registro
  onSubmit() {
    if (this.user.email && this.user.username && this.user.password) {
      alert(`Usuario registrado, ${this.user.username}!`);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  // Simula el regreso a login
  onRegister() {
    alert('Regresar a login no implementado.');
  }
}
