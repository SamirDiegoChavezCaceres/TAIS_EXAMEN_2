import { Component } from '@angular/core';
import { InventoryTableComponent } from "../inventory-table/inventory-table.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InventoryTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) { }
  handleAddProduct() : void{
    this.router.navigate(['/home/agregarProducto']);
  }
}
