import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [FormsModule]
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

  existingCodes = ['P001', 'P002', 'P003'];

  // Método para enviar el formulario
  onSubmit() {
    if (this.existingCodes.includes(this.product.code)) {
      alert('El código ya está registrado');
      return;
    }
    this.existingCodes.push(this.product.code);
    alert('Producto registrado correctamente');
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