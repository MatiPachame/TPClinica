import { Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ErrorComponent } from './componentes/error/error.component';
import { AdministrarMedicosComponent } from './componentes/administrar-medicos/administrar-medicos.component';
import { NuevoTurnoComponent } from './componentes/nuevo-turno/nuevo-turno.component';
import { InstitucionalComponent } from './componentes/institucional/institucional.component';
import { HistorialComponent } from './componentes/historial/historial.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { AceptarTurnosComponent } from './componentes/aceptar-turnos/aceptar-turnos.component';
import { ModificarHorariosComponent } from './componentes/modificar-horarios/modificar-horarios.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';

export const routes: Routes = [

    {path:'principal', component:PrincipalComponent, children:[
        {path:'login', component:LoginComponent},
        {path:'registro', component:RegistroComponent},
        {path:'bienvenida', component:BienvenidaComponent},
        {path:'institucional', component:InstitucionalComponent}

    ]},

    {path:'bienvenida', component:BienvenidaComponent, children:[
        {path:'nuevo_turno', component:NuevoTurnoComponent},
        {path:'administrar_medicos', component:AdministrarMedicosComponent},
        {path:'historial', component:HistorialComponent},
        {path:'turnos', component:TurnosComponent},
        {path:'perfil', component:PerfilComponent},
        {path:'aceptar-turnos', component:AceptarTurnosComponent},
        {path:'modificar-horarios', component:ModificarHorariosComponent},
        {path:'reportes', component:ReportesComponent},
        {path:'pacientes', component:PacientesComponent},
        {path:'calendario', component:CalendarioComponent},
    ]},


    {path:'', redirectTo: 'principal' , pathMatch:'full'},
    {path:'**', component:ErrorComponent},
];
