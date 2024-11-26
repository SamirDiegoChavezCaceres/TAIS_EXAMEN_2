import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SimpleLoginComponent } from "./simple-login/simple-login.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { InventoryTableComponent } from "./inventory-table/inventory-table.component";
import { ProductComponent } from "./product/product.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleLoginComponent, ProductFormComponent, InventoryTableComponent, ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
