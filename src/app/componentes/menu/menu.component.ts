import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../entidades/usuario';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  public listaUsuario:Usuario [] = [];
  public estaLogueado:boolean=false;
  private route: Router = new Router;

  constructor(){

    //Si hay, se guarda en listaUsuario el usuario que este logueado desde el LocalStorage
    this.listaUsuario = JSON.parse(localStorage.getItem('usuarios') || '[]');

    //Verifico si hay un usuario logueado
    if(this.listaUsuario.length==1)
      this.estaLogueado=true;
  }
    public logout(){
    //Vaciamos el local storage de la sesion iniciada
    localStorage.removeItem('usuarioLogueado');


    //Reedireaccionamos a principal
    this.route.navigateByUrl('/principal');

  }





  





}
