import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { get } from 'http';
import { ProductInterface } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
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
}
