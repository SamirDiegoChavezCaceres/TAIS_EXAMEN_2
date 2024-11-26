import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

interface InventoryItem {
  product_id: string;
  description: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}
interface ApiResponse {
  products: InventoryItem[];
}
@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  imports: [CommonModule],
  styleUrls: ['./inventory-table.component.css'],
  standalone: true 
})

export class InventoryTableComponent implements OnInit {
  private apiUrl = 'https://0f7ttojh76.execute-api.us-east-1.amazonaws.com/dev/products';

  // Signals para manejar el estado
  inventory = signal<InventoryItem[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  // Computed signal para verificar si hay datos
  hasInventory = computed(() => this.inventory().length > 0);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.http.get<ApiResponse>(this.apiUrl).pipe(
      catchError(err => {
        this.error.set('No se pudieron cargar los datos del inventario');
        console.error('Error loading inventory', err);
        return of({ products: [] });  // Devuelves un objeto con products vacío en caso de error
      })
    ).subscribe(response => {
      this.inventory.set(response.products);  // Accedes a la propiedad 'products' del objeto
      this.isLoading.set(false);
    });
  }

  // inventory = [
  //   { codigo: '001', nombre: 'Laptop', descripcion: 'Computadora portátil de 15 pulgadas', cantidad: 20, precio: 700, categoria: 'Electrónica' },
  //   { codigo: '002', nombre: 'Mouse', descripcion: 'Mouse inalámbrico', cantidad: 50, precio: 25, categoria: 'Accesorios' },
  //   { codigo: '003', nombre: 'Teclado', descripcion: 'Teclado mecánico', cantidad: 30, precio: 50, categoria: 'Accesorios' },
  //   { codigo: '001', nombre: 'Laptop', descripcion: 'Computadora portátil de 15 pulgadas', cantidad: 20, precio: 700, categoria: 'Electrónica' },
  //   { codigo: '002', nombre: 'Mouse', descripcion: 'Mouse inalámbrico', cantidad: 50, precio: 25, categoria: 'Accesorios' },
  //   { codigo: '003', nombre: 'Teclado', descripcion: 'Teclado mecánico', cantidad: 30, precio: 50, categoria: 'Accesorios' },
  //   { codigo: '001', nombre: 'Laptop', descripcion: 'Computadora portátil de 15 pulgadas', cantidad: 20, precio: 700, categoria: 'Electrónica' },
  //   { codigo: '002', nombre: 'Mouse', descripcion: 'Mouse inalámbrico', cantidad: 50, precio: 25, categoria: 'Accesorios' },
  //   { codigo: '003', nombre: 'Teclado', descripcion: 'Teclado mecánico', cantidad: 30, precio: 50, categoria: 'Accesorios' }
  // ];
}
