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
import { LogueadoNivel2Guard, LogueadoNivel3Guard,usuarioDeslogueadoGuard, usuarioLogueadoGuard } from './guards/usuario-logueado.guard';
import { ForoComponent } from './componentes/foro/foro.component';

export const routes: Routes = [

    // {path:'principal', component:PrincipalComponent,children:[
    {path:'principal', loadComponent:() => import('./componentes/principal/principal.component').then(l => l.PrincipalComponent),children:[
        {path:'login', component:LoginComponent, canActivate:[usuarioDeslogueadoGuard]},
        {path:'registro', component:RegistroComponent,canActivate:[usuarioDeslogueadoGuard]},
        {path:'institucional', component:InstitucionalComponent, canActivate:[usuarioDeslogueadoGuard]},
        {path: 'foro', component:ForoComponent, canActivate:[usuarioDeslogueadoGuard]}
    ]},

    // {path:'bienvenida', component:BienvenidaComponent, canActivate:[usuarioLogueadoGuard], children:[
        {path:'bienvenida', loadComponent:() => import('./componentes/bienvenida/bienvenida.component').then(l => l.BienvenidaComponent), canActivate:[usuarioLogueadoGuard], children:[
        {path:'nuevo_turno', component:NuevoTurnoComponent},
        // {path:'administrar_medicos', component:AdministrarMedicosComponent, canActivate:[LogueadoNivel3Guard]},
        {path:'administrar_medicos',  loadComponent:() => import('./componentes/administrar-medicos/administrar-medicos.component').then(l => l.AdministrarMedicosComponent), canActivate:[LogueadoNivel3Guard]},
        {path:'historial', component:HistorialComponent},
        {path:'turnos', component:TurnosComponent},
        {path:'perfil', component:PerfilComponent},
        {path:'aceptar-turnos', component:AceptarTurnosComponent,canActivate:[LogueadoNivel2Guard]},
        {path:'modificar-horarios', component:ModificarHorariosComponent, canActivate:[LogueadoNivel2Guard]},
        {path:'reportes', component:ReportesComponent, canActivate:[LogueadoNivel2Guard]},
        {path:'pacientes', component:PacientesComponent, canActivate:[LogueadoNivel2Guard]},
        {path:'calendario', component:CalendarioComponent, canActivate:[LogueadoNivel2Guard]},
    ]},


    {path:'', redirectTo: 'principal' , pathMatch:'full'},
    {path:'**', component:ErrorComponent},
];
