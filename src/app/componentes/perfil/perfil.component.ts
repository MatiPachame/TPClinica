import { Component } from '@angular/core';
import { DataUsuario } from '../../entidades/data-usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  public decode:DataUsuario = {data: {id: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:1}};

  constructor(private usuarioservices:UsuarioService){
    const token = localStorage.getItem('UsuarioToken');
    this.decode = jwtDecode<any>(token!);
    console.log("Usuario:",this.decode);
  }
}
