import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class UserFormComponent {

  user: UserInterface = { userId: "", username: '', password: '' };
  constructor(private userService: UserService, private router: Router) { }

  isLoading: boolean = false;
 
  //Validamos el registro
  onSubmit() {
    this.isLoading = true;
    //Validar que el usuario no exista
    this.userService.addUser(this.user).subscribe({
      next: () => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error.error);
        alert('Ya existe un usuario con el mismo nombre.');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  //Regreso a login
  onCancel() {
    this.router.navigate(['/login']);
  }
}
