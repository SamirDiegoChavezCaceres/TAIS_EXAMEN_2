import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductInterface } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})

export class ProductFormComponent implements OnInit {
  
  constructor(private productService: ProductService, private router: Router) { }
  
  // Producto actual para el formulario
  product: ProductInterface = {
    product_id: '',
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    category: '',
  };

  isLoading: boolean = false;

  ngOnInit(): void {
  }

 

  // Método para enviar el formulario
  onSubmit(): void {
    // Verificar si el código ya existe

    this.isLoading = true;

    this.productService.addProduct(this.product).subscribe({
      next: () => {
        alert('Producto registrado correctamente');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al registrar producto:', error.error.error);
        alert('Ya existe un producto con el mismo código.');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  // Método para limpiar el formulario
  onReset(): void {
    this.product = {
      product_id: '',
      description: '',
      name: '',
      price: 0,
      category: '',
      quantity: 0,
    };
  }

  handleHome(): void {
    this.router.navigate(['/home']);
  }
}