import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInterface } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  imports: [CommonModule],
  styleUrls: ['./inventory-table.component.css'],
  standalone: true 
})

export class InventoryTableComponent implements OnInit {

  productList: ProductInterface[] = [];
  constructor(private productService: ProductService) { }

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
  hasProducts(): boolean {
    return this.productList.length > 0;
  }
}