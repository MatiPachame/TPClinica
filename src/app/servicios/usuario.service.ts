import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() {
    
    this.listaUsuario = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if(localStorage.getItem('usuarioLogueado') ?? '' != ''){
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado') ?? '');
    }

   }
    public usuarioLogueado:Usuario= {nombre:'', password:'', mail:''};

    public listaUsuario:Usuario[] = [];

    public estoyLogueado() :boolean{
      return this.usuarioLogueado.nombre != '';    }


    public setLogueado(){
      if(localStorage.getItem('usuarioLogueado') ?? '' != ''){
        this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado') ?? '' );
      }

    }




}
