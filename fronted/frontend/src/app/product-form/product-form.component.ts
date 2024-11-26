import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

interface Product {
  code: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  category: string;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ProductFormComponent implements OnInit {
  // URL base de la API (reemplazar con tu URL real)
  private apiUrl = 'https://tu-api.com/productos';

  // Signals para manejar el estado
  products = signal<Product[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  // Producto actual para el formulario
  product = signal<Product>({
    code: '',
    name: '',
    description: '',
    quantity: 0,
    unitPrice: 0,
    category: ''
  });

  // Computed signal para verificar si el código ya existe
  isCodeUnique = computed(() => 
    !this.products().some(p => p.code === this.product().code)
  );

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Cargar productos existentes
  loadProducts(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(err => {
        this.error.set('No se pudieron cargar los productos');
        console.error(err);
        return of([]);
      })
    ).subscribe(data => {
      this.products.set(data);
      this.isLoading.set(false);
    });
  }

  // Método para enviar el formulario
  onSubmit(): void {
    // Verificar si el código ya existe
    if (!this.isCodeUnique()) {
      this.error.set('El código de producto ya está registrado');
      return;
    }

    // Preparar datos del producto
    const newProduct = this.product();

    // Iniciar carga
    this.isLoading.set(true);
    this.error.set(null);

    // Enviar producto
    this.http.post<Product>(this.apiUrl, newProduct).pipe(
      catchError(err => {
        this.error.set('No se pudo registrar el producto');
        console.error(err);
        this.isLoading.set(false);
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        // Actualizar lista de productos
        this.products.update(products => [...products, response]);
        
        // Mensaje de éxito
        alert('Producto registrado correctamente');
        
        // Navegar a home
        this.router.navigate(['/home']);
      }
      this.isLoading.set(false);
    });
  }

  // Método para actualizar el producto
  updateProduct(field: keyof Product, value: any): void {
    this.product.update(current => ({
      ...current,
      [field]: value
    }));
  }

  // Método para limpiar el formulario
  onReset(): void {
    this.product.set({
      code: '',
      name: '',
      description: '',
      quantity: 0,
      unitPrice: 0,
      category: ''
    });
    this.error.set(null);
  }
}