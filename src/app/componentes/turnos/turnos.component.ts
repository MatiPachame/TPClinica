import { Component } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../entidades/usuario';
import { Disponibilidad } from '../../clases/disponibilidad';
import { CommonModule } from '@angular/common';
import { DataUsuario } from '../../entidades/data-usuario';
import { jwtDecode } from 'jwt-decode';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PasstocsvService } from '../../servicios/passtocsv.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FiltromedsPipe } from '../../pipe/filtromeds.pipe';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,MatFormFieldModule, MatInputModule, MatIconModule, FiltromedsPipe],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css'
})
export class TurnosComponent {

  public turnos:Disponibilidad[] = [];
  public decode:DataUsuario = {data: {id: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:1}};
  public filtroEspecialidad: string = '';


  constructor(private usuarioservices:UsuarioService, private route:Router,private dialog: MatDialog,private passtocsvService: PasstocsvService){

    const token = localStorage.getItem('UsuarioToken');
    this.decode = jwtDecode<any>(token!);

    console.log(this.decode);
    this.usuarioservices.GetMisTurnos_Paciente(this.decode).subscribe(
      x=> {
        if((<Disponibilidad[]>x)?.length >=1){
          console.log("Se han encontrado turnos aceptado", x);
          this.turnos = Object.assign([], x);
      } else {
        alert("No se encontraron turnos aceptados");
        this.route.navigateByUrl('/bienvenida');
      }});

  }

  public Chat(turno:Disponibilidad){
    
  }
}
