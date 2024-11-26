import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    // ProductComponent,
    UserLoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'products';
}
