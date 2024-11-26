import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class UserFormComponent {
  user = { userId: "", username: '', password: '' };
  constructor(private router: Router) { }
  validRegister: boolean = false;
  
  //Validamos el registro
  onSubmit() {
    
    //Validar que el usuario no exista
    if (this.user.username && this.user.password) {
      this.router.navigate(['/login']);
      //registrar al usuario
      alert(`Usuario registrado, ${this.user.username}!`);
    } else {
      alert('Usuario ya existente');
    }
  }

  //Regreso a login
  onCancel() {
    this.router.navigate(['/login']);
  }
}
