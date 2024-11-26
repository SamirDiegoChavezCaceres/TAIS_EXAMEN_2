import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductInterface } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

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

  insertProduct() {
    this.productService.insertProduct().subscribe({
      next: (result) => {
        this.getProducts();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
