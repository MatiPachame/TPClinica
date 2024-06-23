import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Disponibilidad } from '../../clases/disponibilidad';
import { QuitarusadosPipe } from "../../pipe/quitarusados.pipe";

@Component({
    selector: 'app-nuevo-turno',
    standalone: true,
    templateUrl: './nuevo-turno.component.html',
    styleUrl: './nuevo-turno.component.css',
    imports: [CommonModule, QuitarusadosPipe]
})
export class NuevoTurnoComponent {
  public usuario:Usuario = {id: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:1};
  public listaUsuario:Usuario [] = [];
  public medicos:Usuario [] = [];
  public disponibilidad:Disponibilidad [] = [];
  public turnosusados:Array<Disponibilidad> = [];

  

  constructor(private usuarioservices:UsuarioService) {
    this.usuario = JSON.parse(localStorage.getItem('usuarioLogueado') || '[]');
    
    this.usuarioservices.GetDisponibilidadMedicos(this.medicos).subscribe(
      x=> {
    
          if((<Usuario[]>x).length >=1){
              console.log("Se han encontrado medicos/admins");
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
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  public buscarDisponibilidad(){
    const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
    const hoy = new Date();

    for (let i = 0; i < 14; i++) {
        const diaActual = new Date();
        diaActual.setDate(hoy.getDate() + i);
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
                        id_usuario: this.usuario.id,
                        nombre: medico.nombre,
                        apellido: medico.apellido,
                        especialidad: medico.especialidad,
                        fecha: this.formatDateForMySQL(new Date(diaActual)), // Convertir fecha al formato MySQL
                        hora: hora,
                        aceptado: false
                    });
                }
            }
        });
    }

    return this.disponibilidad;
}

tomarTurno(index: number){

  let turnoTomado = this.disponibilidad[index];


         this.usuarioservices.nuevoTurno(turnoTomado).subscribe(
             x=>{

                alert("Turno tomado correctamente");

             }
         );
}

}
