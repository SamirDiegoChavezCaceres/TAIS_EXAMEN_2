import { Component } from '@angular/core';
import { InventoryTableComponent } from "../inventory-table/inventory-table.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InventoryTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
