import { Component, OnInit } from '@angular/core';
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
export class SimpleLoginComponent implements OnInit {
  user = { username: '', password: '' };

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    console.log("simple-login.ngOnInit", this.auth.isAuthenticated())
    if(this.auth.isAuthenticated())
      this.router.navigate(['/home'])
  }

  //logica del boton para mostrar contraseña
  isPasswordVisible = false; // Variable para controlar la visibilidad de la contraseña
  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  } 

  // Simula el inicio de sesión
  onSubmit() {
    //Validar que los datos ingresados sean correctos
    if (!this.user.username || !this.user.password)
      alert("Ingrese credenciales válidas")
    this.auth.login(
      { username: this.user.username, password: this.user.password }
    ).subscribe(data => {
      if (data){
        alert(`Bienvenido, ${this.user.username}!`);
        this.router.navigate(['/home'])
      }
      else
        alert('Usuario o contraseña incorrectos');
    });
  }

  //Lleva a form registro
  onRegister() {
    this.router.navigate(['/register']);
  }
}
