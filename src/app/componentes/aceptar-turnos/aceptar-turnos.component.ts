import { Component } from '@angular/core';
import { Disponibilidad } from '../../clases/disponibilidad';
import { UsuarioService } from '../../servicios/usuario.service';
import { DataUsuario } from '../../entidades/data-usuario';
import { jwtDecode } from 'jwt-decode';
import { Usuario } from '../../entidades/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltroTurnosAceptadosPipe } from '../../pipe/filtro-turnos-aceptados.pipe';

@Component({
  selector: 'app-aceptar-turnos',
  standalone: true,
  imports: [CommonModule,FormsModule, FiltroTurnosAceptadosPipe],
  templateUrl: './aceptar-turnos.component.html',
  styleUrl: './aceptar-turnos.component.css'
})
export class AceptarTurnosComponent {

  public turnos:Disponibilidad[] = [];
  public decode:DataUsuario = {data: {id: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:1}};
  public usuario:Usuario = {id: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:1};


    constructor(private usuarioservices:UsuarioService){

      const token = localStorage.getItem('UsuarioToken');
      this.decode = jwtDecode<any>(token!);


      this.usuarioservices.GetTurnos(this.decode).subscribe(
        x=> {
          if((<Disponibilidad[]>x)?.length >=1){
            console.log("Se han encontrado turnos", x);
            this.turnos = Object.assign([], x);
        } else {
          console.log("No se han encontrado turnos o x es null/undefined", x);
        }
          
        });

    }

    public Aceptarturno(turno: Disponibilidad){


      console.log("Turno aceptado");
      this.usuarioservices.turnoAceptado(turno).subscribe(
        x=>{

           alert("Turno aceptado correctamente!");

        }
    );

    }

    public Rechazarturno(turno: Disponibilidad){
      console.log("Turno rechazado");
      this.usuarioservices.turnoRechazado(turno).subscribe(
        x=>{

           alert("Turno rechazado correctamente!");

        }
    );
      
    }
}
