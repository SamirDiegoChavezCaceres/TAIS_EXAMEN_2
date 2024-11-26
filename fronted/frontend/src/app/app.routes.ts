import { Routes } from '@angular/router';
import { SimpleLoginComponent } from './simple-login/simple-login.component';
import { UserFormComponent } from './user-form/user-form.component';
import { HomeComponent } from './home/home.component';
import { ProductFormComponent } from './product-form/product-form.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
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
        component: HomeComponent
    },
    {
        path: 'home/agregarProducto',
        component: ProductFormComponent
    },
    {
         path: '**', loadComponent: () =>  import('./not-found/not-found.component').then(comp  => comp.NotFoundComponent)
    }
];
