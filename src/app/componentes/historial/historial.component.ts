import { Component } from '@angular/core';
import { Disponibilidad } from '../../clases/disponibilidad';
import { DataUsuario } from '../../entidades/data-usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PasstocsvService } from '../../servicios/passtocsv.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CalificarAtencionComponent } from '../../ventanas/diagnostico-dialog/calificar-atencion/calificar-atencion.component';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
  public turnos: Disponibilidad[] = [];
  public decode: DataUsuario = { data: { id: 0, nombre: '', apellido: '', mail: '', nacimiento: new Date(), usuario: '', password: '', tipo_usuario: 0, autorizado: 1 } };

  constructor(private usuarioservices: UsuarioService, private route: Router, private dialog: MatDialog) {
    const token = localStorage.getItem('UsuarioToken');
    this.decode = jwtDecode<any>(token!);

    this.usuarioservices.GetHistorial_Paciente(this.decode).subscribe(
      x => {
        if ((<Disponibilidad[]>x)?.length >= 1) {
          this.turnos = Object.assign([], x);
        } else {
          alert('No se encontraron turnos');
          this.route.navigateByUrl('/bienvenida');
        }
      });
  }

  public verDiagnostico(turno: Disponibilidad): void {
    alert(`Diagnóstico: ${turno.diagnostico || 'No disponible'}`);
  }

  public resenia(turno: Disponibilidad): void {
    const dialogRef = this.dialog.open(CalificarAtencionComponent, {
      width: '400px',
      panelClass: 'full-width-dialog',
      data: { turno: turno }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Asigna la calificación y reseña al turno
        turno.val_med = result.calificacion;
        turno.comentario_med = result.comentario;

        console.log(turno);

        // Guarda los datos en la base de datos
        this.usuarioservices.valoracionPaciente(turno).subscribe(
          x => {
            alert('Reseña guardada correctamente!');
          });
      }
    });
  }
}

