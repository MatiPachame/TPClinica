import { Component } from '@angular/core';
import { Disponibilidad } from '../../clases/disponibilidad';
import { DataUsuario } from '../../entidades/data-usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {


  public turnos:Disponibilidad[] = [];
  public decode:DataUsuario = {data: {id: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:1}};

  constructor(private usuarioservices:UsuarioService, private route:Router){

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

  public Finalizarturno(turno:Disponibilidad){
    this.reseña(turno)
  }

  public Chat(turno:Disponibilidad){

  }

  public reseña(turno:Disponibilidad){
    
  }

}
