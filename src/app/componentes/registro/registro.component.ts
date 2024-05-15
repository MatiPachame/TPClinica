import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../entidades/usuario';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  

  listaUsuarios:Usuario[] = [];
  public usuario:Usuario = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0};
  public password2:string = '';

  constructor(public router:Router,private us:UsuarioService){
    this.listaUsuarios =JSON.parse(localStorage.getItem('usuarios') || "[]");
  }


  validarExiste(){
    return this.us.listaUsuario.filter(t=> t.nombre.toLowerCase() == this.usuario.nombre.toLowerCase()).length == 1;
  }

  public registrar(){
    this.us.listaUsuario.push(this.usuario);
    localStorage.setItem('usuarios',JSON.stringify(this.us.listaUsuario));
    this.us.listaUsuario=JSON.parse(JSON.stringify(this.us.listaUsuario));
    this.router.navigateByUrl('/principal');

  }

  

}
