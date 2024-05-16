import { Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ErrorComponent } from './componentes/error/error.component';
import { RegistroMedicoComponent } from './componentes/registro-medico/registro-medico.component';

export const routes: Routes = [

    {path:'principal', component:PrincipalComponent, children:[
        {path:'login', component:LoginComponent},
        {path:'registro', component:RegistroComponent},
        {path:'registro_medico', component:RegistroMedicoComponent},
        {path:'bienvenida', component:BienvenidaComponent}

    ]},


    {path:'', redirectTo: 'principal' , pathMatch:'full'},
    {path:'**', component:ErrorComponent},
];
