import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {
  userList: UserInterface[] = [];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (result) => {
        this.userList = result.users;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  hasUsers(): boolean {
    return this.userList.length > 0;
  }
  handleHome(): void {
    this.router.navigate(['/home']);
  }
}