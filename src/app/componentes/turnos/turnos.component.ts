import { Component } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../entidades/usuario';
import { Disponibilidad } from '../../clases/disponibilidad';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css'
})
export class TurnosComponent {

  public medicos:Usuario [] = [];
  public disponibilidad:Disponibilidad [] = []

  constructor(private usuarioservices:UsuarioService) {
    
    this.usuarioservices.GetDisponibilidadMedicos(this.medicos).subscribe(
      x=> {
    
          if((<Usuario[]>x).length >=1){
              console.log("Se han encontrado medicos/admins");
              this.medicos = Object.assign([], x);
          }
    });


    


  }



}
