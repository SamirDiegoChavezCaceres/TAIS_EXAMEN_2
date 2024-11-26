import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple-login',
  templateUrl: './simple-login.component.html',
  styleUrls: ['./simple-login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class SimpleLoginComponent {
  user = { username: '', password: '' };
  constructor(private router: Router) { }
  // Simula el inicio de sesión
  onSubmit() {
    //Validar que los datos ingresados sean correctos
    if (this.user.username && this.user.password) {
      alert(`Bienvenido, ${this.user.username}!`);
      this.router.navigate(['/home']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  //Lleva a form registro
  onRegister() {
    this.router.navigate(['/register']);
  }
}
