import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API:String = "https://matipachame-apiclinica.mdbgo.io";

  public usuarioLogueado: Usuario = { nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0};

  public listaUsuario: Usuario[] = [];

  constructor(public http:HttpClient) {
    this.listaUsuario = JSON.parse(localStorage.getItem('usuarios') || '[]');
     this.setLogueado()

    // this.listaUsuario = JSON.parse(localStorage.getItem('usuarios') || '[]');
    // if(localStorage.getItem('usuarioLogueado') ?? '' != ''){
    //   this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado') ?? '');
    // }
  
  //  }
  //   public usuarioLogueado:Usuario= {nombre:'', password:'', mail:''};

  //   public listaUsuario:Usuario[] = [];

  //   public estoyLogueado() :boolean{
  //     return this.usuarioLogueado.nombre != '';    }


  //   public setLogueado(){
  //     if(localStorage.getItem('usuarioLogueado') ?? '' != ''){
  //       this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado') ?? '' );
  //     }
    }

    public estoyLogueado():boolean{
      return this.usuarioLogueado.nombre !='';
    }

    public setLogueado(){
      if (localStorage.getItem('usuarioLogueado') ?? '' != '')
        this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado') ?? '');
    }

    public loginAPI(usuario:Usuario){
      return this.http.post(this.API + "/login",usuario);
    }

    public setLogueadoXApi(usuario:Usuario){
      this.usuarioLogueado = usuario;
    }

    public registrar(usuario:Usuario){
      return this.http.post(this.API + "/insertar", usuario);
    }



}
