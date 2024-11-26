import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ProductFormComponent {
  product = {
    code: '',
    name: '',
    description: '',
    quantity: null,
    unitPrice: null,
    category: ''
  };
  constructor(private router: Router) { }
  existingCodes = ['P001', 'P002', 'P003'];

  // Método para enviar el formulario
  onSubmit() {
    //Agregar la logica para validar que no exista un producto similar (nombre) 
    if (this.existingCodes.includes(this.product.code)) {
      alert('El código ya está registrado');
      return;
    }
    //Agregar la lógica para que se envie el producto 
    this.existingCodes.push(this.product.code);
    alert('Producto registrado correctamente');
    this.router.navigate(['/home']);        
  }

  // Método para limpiar el formulario
  onReset() {
    this.product = {
      code: '',
      name: '',
      description: '',
      quantity: null,
      unitPrice: null,
      category: ''
    };
  }
}