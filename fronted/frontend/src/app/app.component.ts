import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SimpleLoginComponent } from "./simple-login/simple-login.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { InventoryTableComponent } from "./inventory-table/inventory-table.component";
import { UserFormComponent } from "./user-form/user-form.component";


@Component({
  selector: 'app-root',
  standalone: true,
// <<<<<<< bootstrap
//   imports: [RouterOutlet, SimpleLoginComponent, ProductFormComponent, InventoryTableComponent, ProductComponent],
  imports: [RouterOutlet, SimpleLoginComponent, ProductFormComponent, InventoryTableComponent, UserFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
