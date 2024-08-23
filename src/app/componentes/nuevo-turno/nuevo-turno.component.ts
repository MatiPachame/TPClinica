import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Disponibilidad } from '../../clases/disponibilidad';
import { QuitarusadosPipe } from "../../pipe/quitarusados.pipe";
import { FiltromedsPipe } from "../../pipe/filtromeds.pipe";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DataUsuario } from '../../entidades/data-usuario';

@Component({
    selector: 'app-nuevo-turno',
    standalone: true,
    templateUrl: './nuevo-turno.component.html',
    styleUrl: './nuevo-turno.component.css',
    imports: [CommonModule, QuitarusadosPipe, FiltromedsPipe, FormsModule, RouterModule]
})
export class NuevoTurnoComponent {
  public data:Usuario = {id: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:1};
  public medicos:Usuario [] = [];
  public disponibilidad:Disponibilidad [] = [];
  public turnosusados:Array<Disponibilidad> = [];
  public filtroEspecialidad: string = '';
  public decode:DataUsuario = {data: {id: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:1}}

  

  constructor(private usuarioservices:UsuarioService) {
    const token = localStorage.getItem('UsuarioToken');
    this.decode = jwtDecode<any>(token!);

    
    this.usuarioservices.GetDisponibilidadMedicos(this.medicos).subscribe(
      x=> {
    
          if((<Usuario[]>x).length >=1){
              console.log("Se han encontrado medicos/admins");
              console.log("Medicos/admins encontrados:", x); // Verificar datos recibidos
              this.medicos = Object.assign([], x);
              this.sacarUsados(); 
          }

          
    });
 
  }

  public sacarUsados(){
    this.usuarioservices.GetTurnosTomados(this.turnosusados).subscribe(
      x=> {
        if((<Disponibilidad[]>x).length >=1){
          console.log("Se han encontrado turnos usados");
          this.turnosusados = Object.assign([], x);
          this.buscarDisponibilidad();
      }
        
      });
  }

  public formatDateForMySQL(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Añadir cero a la izquierda si es necesario
    const day = ('0' + date.getDate()).slice(-2);
    const hours = '00';
    const minutes = '00';
    const seconds = '00';
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


  public buscarDisponibilidad(){
    const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
    const hoy = new Date();

    for (let i = 0; i < 14; i++) {
        const diaActual = new Date();
        diaActual.setDate(hoy.getDate() + i);
        diaActual.setHours(0, 0, 0, 0); // Establecer la hora en 00:00:00
        const diaSemanaIndex = (diaActual.getDay() + 6) % 7; // Convertir el índice del día (0-6) para empezar con lunes en 0

        if (diaSemanaIndex >= 5) {
            continue; // Si es sábado o domingo, continuamos al siguiente día
        }

        this.medicos.forEach(medico => {
            if (medico.dias_atencion && medico.dias_atencion[diaSemanaIndex]) {
                const desde = medico.horario_desde ?? 0; // Default a 0 si es undefined
                const hasta = medico.horario_hasta ?? 24; // Default a 24 si es undefined

                for (let hora = desde; hora < hasta; hora++) {

                    this.disponibilidad.push({
                        id_medico: medico.id_medico,
                        id_usuario: this.decode.data.id,
                        nombre: medico.nombre,
                        apellido: medico.apellido,
                        especialidad: medico.especialidad,
                        fecha: this.formatDateForMySQL(new Date(diaActual)), // Convertir fecha al formato MySQL
                        hora: hora,
                        aceptado: "Pendiente"
                    });
                }
            }
        });
    }

    console.log('Disponibilidad final:', this.disponibilidad);
    return this.disponibilidad;
}

tomarTurno(turno: Disponibilidad){
    // console.log('Índice:', index);
    console.log('Longitud del array disponibilidad:', this.disponibilidad.length);


  // let turnoTomado = this.disponibilidad[index];

  console.log('Turno tomado:', turno);


         this.usuarioservices.nuevoTurno(turno).subscribe(
             x=>{

                alert("Turno tomado correctamente");

             }
         );
}

}
