import { RouterModule, Routes } from '@angular/router';
import { SimpleLoginComponent } from './simple-login/simple-login.component';
import { UserFormComponent } from './user-form/user-form.component';
import { HomeComponent } from './home/home.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { UserTableComponent } from './user-table/user-table.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: SimpleLoginComponent
    },
    {
        path: 'register',
        component: UserFormComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'home/agregarProducto',
        component: ProductFormComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "home/listarUsuarios",
        component: UserTableComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: '**', 
        loadComponent: () =>  import('./not-found/not-found.component').then(comp  => comp.NotFoundComponent)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}