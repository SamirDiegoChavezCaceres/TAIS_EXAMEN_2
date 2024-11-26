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
  
  productList: ProductInterface[] = [];
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
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (result) => {
        this.productList = result.products;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  isCodeUnique(): boolean {
    return !this.productList.some((p) => p.product_id === this.product.product_id);
  }

  // Método para enviar el formulario
  onSubmit(): void {
    // Verificar si el código ya existe
    if (!this.isCodeUnique()) {
      this.errorMessage = 'El ID del producto ya está registrado.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.productService.addProduct(this.product).subscribe({
      next: (newProduct) => {
        this.productList.push(newProduct);
        alert('Producto registrado correctamente');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al registrar producto:', error);
        this.errorMessage = 'No se pudo registrar el producto.';
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
}