import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-simple-login',
  templateUrl: './simple-login.component.html',
  styleUrls: ['./simple-login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class SimpleLoginComponent {
  user = { username: '', password: '' };

  constructor(private router: Router, private auth: AuthService) { }
  // Simula el inicio de sesión
  onSubmit() {
    //Validar que los datos ingresados sean correctos
    if (this.user.username && this.user.password) {
      alert(`Bienvenido, ${this.user.username}!`);
      this.auth.login(
        { username: this.user.username, password: this.user.password }
      );
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
