import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../entidades/usuario';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../servicios/usuario.service';

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
  

  constructor(public usuarioservices:UsuarioService){

    

    if(this.usuarioservices.usuarioLogueado.usuario != '' )
      this.estaLogueado=true;
      this.listaUsuario = JSON.parse(localStorage.getItem('usuarioLogueado') || '[]');



    //Si hay, se guarda en listaUsuario el usuario que este logueado desde el LocalStorage
    //this.listaUsuario = JSON.parse(localStorage.getItem('usuarioLogueado') || '[]');

    //Verifico si hay un usuario logueado
    //if(this.listaUsuario.length>0)
      //this.estaLogueado=true;
  }
    public logout(){
    //Vaciamos el local storage de la sesion iniciada
    localStorage.removeItem('usuarioLogueado');


    this.listaUsuario = [];
    this.usuarioservices.usuarioLogueado = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0,autorizado:false};
    this.estaLogueado=false;

    //Reedireaccionamos a principal
    this.route.navigateByUrl('/principal');

  }





  





}
