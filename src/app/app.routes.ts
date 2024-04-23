import { Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';

export const routes: Routes = [
    {path:'**', component:BienvenidaComponent},
    {path:'login', component:LoginComponent},
    {path:'registro', component:RegistroComponent}
];
