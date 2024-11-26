import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  imports: [CommonModule],
  styleUrls: ['./inventory-table.component.css'],
  standalone: true 
})
export class InventoryTableComponent {
  // Datos del inventario 
  inventory = [
    { codigo: '001', nombre: 'Laptop', descripcion: 'Computadora portátil de 15 pulgadas', cantidad: 20, precio: 700, categoria: 'Electrónica' },
    { codigo: '002', nombre: 'Mouse', descripcion: 'Mouse inalámbrico', cantidad: 50, precio: 25, categoria: 'Accesorios' },
    { codigo: '003', nombre: 'Teclado', descripcion: 'Teclado mecánico', cantidad: 30, precio: 50, categoria: 'Accesorios' },
    { codigo: '001', nombre: 'Laptop', descripcion: 'Computadora portátil de 15 pulgadas', cantidad: 20, precio: 700, categoria: 'Electrónica' },
    { codigo: '002', nombre: 'Mouse', descripcion: 'Mouse inalámbrico', cantidad: 50, precio: 25, categoria: 'Accesorios' },
    { codigo: '003', nombre: 'Teclado', descripcion: 'Teclado mecánico', cantidad: 30, precio: 50, categoria: 'Accesorios' },
    { codigo: '001', nombre: 'Laptop', descripcion: 'Computadora portátil de 15 pulgadas', cantidad: 20, precio: 700, categoria: 'Electrónica' },
    { codigo: '002', nombre: 'Mouse', descripcion: 'Mouse inalámbrico', cantidad: 50, precio: 25, categoria: 'Accesorios' },
    { codigo: '003', nombre: 'Teclado', descripcion: 'Teclado mecánico', cantidad: 30, precio: 50, categoria: 'Accesorios' }
  ];
}
