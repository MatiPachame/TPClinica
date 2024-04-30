import { Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ErrorComponent } from './componentes/error/error.component';

export const routes: Routes = [

    {path:'principal', component:PrincipalComponent, children:[
        {path:'', component:LoginComponent},
        {path:'registro', component:RegistroComponent},
        {path:'bienvenida', component:BienvenidaComponent}

    ]},


    {path:'', redirectTo: 'principal' , pathMatch:'full'},
    {path:'**', component:ErrorComponent},
];
