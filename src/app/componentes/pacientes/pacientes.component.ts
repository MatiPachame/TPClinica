import { Component } from '@angular/core';
import { Disponibilidad } from '../../clases/disponibilidad';
import { DataUsuario } from '../../entidades/data-usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { CalificarAtencionComponent } from '../calificar-atencion/calificar-atencion.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

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

  constructor(private usuarioservices:UsuarioService, private route:Router,private dialog: MatDialog){

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
      data: { turno: turno }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si se recibe una calificación, asigna la calificación al turno y guárdala en val_pac
        turno.val_pac = result;  // Guarda la calificación en la propiedad `val_pac` del turno
        console.log('Calificación guardada:', turno);
  
        // Aquí podrías realizar alguna otra acción, como enviar el dato a la base de datos
        this.usuarioservices.turnoFinalizado(turno).subscribe(
          x=>{
             alert("Turno finalizado correctamente!");
          }
      );

        
      }
    });


  }

  

  public Chat(turno:Disponibilidad){

  }

}
