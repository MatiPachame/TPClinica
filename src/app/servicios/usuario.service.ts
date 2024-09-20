import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disponibilidad } from '../clases/disponibilidad';
import { jwtDecode } from 'jwt-decode';
import { DataUsuario } from '../entidades/data-usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API: String = "https://matipachame-apiclinica.mdbgo.io";

  public usuarioLogueado: Usuario = { nombre: '', apellido: '', mail: '', nacimiento: new Date(), usuario: '', password: '', tipo_usuario: 0, autorizado: 1 };

  public listaUsuario: Usuario[] = [];

  public decode: any;

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
    if (localStorage.getItem('UsuarioToken') ?? '' != ''){
      this.decode = jwtDecode<any>(localStorage.getItem('UsuarioToken') ?? '');

      this.usuarioLogueado = this.decode.data;
    }
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

  public nuevoTurno(usuario: Disponibilidad){
    return this.http.post(this.API + "/tomar_turno", usuario);
  }

  public GetTurnosTomados(usuario: Disponibilidad[]) {
    return this.http.post(this.API + "/get_turnos_tomados", usuario);
  }

  public GetTurnos(usuario:DataUsuario) {
    return this.http.post(this.API + "/get_turnos", usuario.data);
  }

  public turnoAceptado(turno:Disponibilidad){
    return this.http.post(this.API + "/aceptar_turno", turno);
  }

  public turnoRechazado(turno:Disponibilidad){
    return this.http.post(this.API + "/rechazar_turno", turno);
  }
  
  public GetMisTurnos(usuario:DataUsuario) {
    return this.http.post(this.API + "/get_mis_turnos", usuario.data);
  }

  public turnoFinalizado(turno:Disponibilidad){
    return this.http.post(this.API + "/finalizar_turno", turno);
  }

  public GetMisTurnos_Paciente(usuario:DataUsuario) {
    return this.http.post(this.API + "/get_mis_turnos_paciente", usuario.data);
  }

  public actualizarDiagnostico(turno:Disponibilidad) {
    return this.http.post(this.API + "/actualizar_diagnostico", turno);
  }

  public GetHistorial_Paciente(usuario:DataUsuario) {
    return this.http.post(this.API + "/historial_paciente", usuario.data);
  }

  public valoracionPaciente(turno:Disponibilidad) {
    return this.http.post(this.API + "/valoracion_paciente", turno);
  }


}
