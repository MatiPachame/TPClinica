import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../entidades/usuario';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { LoadingComponent } from "../loading/loading.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule, RouterModule, LoadingComponent]
})
export class LoginComponent {
  public usuario:Usuario = {nombre:'', password:'', mail:''};
  public listaUsuario:Usuario [] = [];


  constructor(private route:Router, private usuarioservices:UsuarioService){

    if(this.usuarioservices.estoyLogueado()){
      route.navigateByUrl('/principal/bienvenida');
    }
  }

  public login(){
    //cargamos la lista desde el local storage
    this.listaUsuario = JSON.parse(localStorage.getItem('usuarios') || '[]');
    //verificamos credenciales
    if(this.listaUsuario.filter(t=> t.nombre.toLowerCase == this.usuario.nombre.toLowerCase && t.password == this.usuario.password ).length == 1){

      //guardamos usuario logueado
      localStorage.setItem('usuarioLogueado', JSON.stringify(this.listaUsuario.filter(t=> t.nombre.toLowerCase == this.usuario.nombre.toLowerCase && t.password == this.usuario.password )[0]));
      
      //pasar a la pagina de bienvenida
      this.route.navigateByUrl('/principal/bienvenida');


    }

    this.usuarioservices.estoyLogueado();

  }

}
