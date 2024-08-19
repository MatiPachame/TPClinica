import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../entidades/usuario';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../servicios/usuario.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  public listaUsuario:Usuario [] = [];
  public estaLogueado:boolean=false;
  private route: Router = new Router;
  public tipoUsuario: number | null = null;
  

  constructor(public usuarioservices:UsuarioService){

    

    if(this.usuarioservices.usuarioLogueado.usuario != '' )
      this.estaLogueado=true;



    //Si hay, se guarda en listaUsuario el usuario que este logueado desde el LocalStorage
      // this.listaUsuario = JSON.parse(localStorage.getItem('TokenUsuario') || '[]');



      // Obtener el token del local storage
  const token = localStorage.getItem('UsuarioToken');

  if (token) {
    // Decodificar el token
    var decode = jwtDecode<any>(token);

    // Extraer el tipo de usuario del token decodificado
    var tipoUsuario = decode.data.tipo_usuario;






    //Si hay, se guarda en listaUsuario el usuario que este logueado desde el LocalStorage
    //this.listaUsuario = JSON.parse(localStorage.getItem('usuarioLogueado') || '[]');

    //Verifico si hay un usuario logueado
    //if(this.listaUsuario.length>0)
      //this.estaLogueado=true;
  }
}
    public logout(){
    //Vaciamos el local storage de la sesion iniciada
    localStorage.removeItem('UsuarioToken');


    this.listaUsuario = [];
    this.usuarioservices.usuarioLogueado = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0,autorizado:1};
    this.estaLogueado=false;

    //Reedireaccionamos a principal
    this.route.navigateByUrl('/principal');

  }

}
