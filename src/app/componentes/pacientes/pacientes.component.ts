import { Component } from '@angular/core';
import { Disponibilidad } from '../../clases/disponibilidad';
import { DataUsuario } from '../../entidades/data-usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { CalificarAtencionComponent } from '../../ventanas/diagnostico-dialog/calificar-atencion/calificar-atencion.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { PasstocsvService } from '../../servicios/passtocsv.service';
import { DiagnosticoDialogComponent } from '../../ventanas/diagnostico-dialog/diagnostico-dialog.component';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {


  public turnos:Disponibilidad[] = [];
  public decode:DataUsuario = {data: {id: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:1}};

  constructor(private usuarioservices:UsuarioService, private route:Router,private dialog: MatDialog,private passtocsvService: PasstocsvService){

    const token = localStorage.getItem('UsuarioToken');
    this.decode = jwtDecode<any>(token!);


    this.usuarioservices.GetMisTurnos(this.decode).subscribe(
      x=> {
        if((<Disponibilidad[]>x)?.length >=1){
          console.log("Se han encontrado turnos aceptado", x);
          this.turnos = Object.assign([], x);
      } else {
        alert("No se encontraron turnos aceptados");
        this.route.navigateByUrl('/bienvenida');
      }});

  }

  public finalizarTurno(turno: Disponibilidad): void {
    const dialogRef = this.dialog.open(CalificarAtencionComponent, {
      width: '400px',
      panelClass: 'full-width-dialog',  // Aumenta el control sobre el diálogo
      data: { turno: turno }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si se recibe una calificación, asigna la calificación al turno y guárdala en val_pac
        turno.val_pac = result.calificacion;  // Guarda la calificación en la propiedad `val_pac` del turno
        turno.comentario_pac = result.comentario;
        console.log('Calificación guardada:', turno);
        console.log('Reseña guardada:', turno.comentario_pac);
  
        // Aquí podrías realizar alguna otra acción, como enviar el dato a la base de datos
        this.usuarioservices.turnoFinalizado(turno).subscribe(
          x=>{
             alert("Turno finalizado correctamente!");
          }
      );

        
      }
    });


  }

  public Chat(turno : Disponibilidad){

  }

  public abrirDiagnostico(turno: Disponibilidad): void {
    const dialogRef = this.dialog.open(DiagnosticoDialogComponent, {
      width: '500px',  // Aumenta el ancho del pop-up
      height: 'auto',  // Ajusta el alto dinámicamente
      panelClass: 'custom-dialog-container',  // Aplica clases personalizadas
      data: { diagnostico: turno.diagnostico || '' }// Pasa el diagnóstico actual o una cadena vacía si no existe
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        turno.diagnostico = result;  // Actualiza el diagnóstico en el objeto turno
        console.log('Diagnóstico actualizado:', result);
  
        // Actualiza el diagnóstico en la base de datos
        this.usuarioservices.actualizarDiagnostico(turno).subscribe(
          x => {
            console.log('Diagnóstico guardado en la base de datos:', x);
            alert("Diagnóstico actualizado correctamente!");
          }
        );
      }
    });
  }
  

  public exportAsCSV() {
    this.passtocsvService.listaturnos(this.turnos);
  }

}
