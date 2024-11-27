import { Component } from '@angular/core';
import { InventoryTableComponent } from "../inventory-table/inventory-table.component";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InventoryTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }
  handleAddProduct() : void{
    this.router.navigate(['/home/agregarProducto']);
  }
  handleListUsers() : void{
    this.router.navigate(['/home/listarUsuarios']);
  }
  handleLogOut() : void{
    this.auth.logout()
    this.router.navigate(['/login']);
  }
}
