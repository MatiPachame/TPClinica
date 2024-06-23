import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API: String = "https://matipachame-apiclinica.mdbgo.io";

  public usuarioLogueado: Usuario = { nombre: '', apellido: '', mail: '', nacimiento: new Date(), usuario: '', password: '', tipo_usuario: 0, autorizado: 1 };

  public listaUsuario: Usuario[] = [];

  constructor(public http: HttpClient) {
    this.listaUsuario = JSON.parse(localStorage.getItem('usuarioLogueado') || '[]');
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

  public estoyLogueado(): boolean {
    return this.usuarioLogueado.usuario != '';
  }

  public setLogueado() {
    if (localStorage.getItem('usuarioLogueado') ?? '' != '')
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado') ?? '');
  }

  public loginAPI(usuario: Usuario) {
    return this.http.post(this.API + "/login", usuario);
  }

  public setLogueadoXApi(usuario: Usuario) {
    this.usuarioLogueado = usuario;

  }

  public registrarEnApi(usuario: Usuario) {
    return this.http.post(this.API + "/insertar", usuario);
  }

  public GetUsuariosAutorizar(usuario: Usuario[]) {
    return this.http.post(this.API + "/get_usuarios_autorizar", usuario);
  }

  public AutorizacionUsuario(usuario: Usuario){
    return this.http.post(this.API + "/autorizacion_usuario", usuario);
  }

  public GetDisponibilidadMedicos(usuario: Usuario[]) {
    return this.http.post(this.API + "/get_disponibilidad", usuario);
  }



}
