import { Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ErrorComponent } from './componentes/error/error.component';
import { AdministrarMedicosComponent } from './componentes/administrar-medicos/administrar-medicos.component';
import { NuevoTurnoComponent } from './componentes/nuevo-turno/nuevo-turno.component';

export const routes: Routes = [

    {path:'principal', component:PrincipalComponent, children:[
        {path:'login', component:LoginComponent},
        {path:'registro', component:RegistroComponent},
        {path:'bienvenida', component:BienvenidaComponent}

    ]},

    {path:'nuevo_turno', component:NuevoTurnoComponent},
    {path:'administrar_medicos', component:AdministrarMedicosComponent},


    {path:'', redirectTo: 'principal' , pathMatch:'full'},
    {path:'**', component:ErrorComponent},
];
