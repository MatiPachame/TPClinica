import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../entidades/usuario';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { LoadingComponent } from "../loading/loading.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule, RouterModule, LoadingComponent, CommonModule]
})
export class LoginComponent {
  public usuario:Usuario = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:false};
  public listaUsuario:Usuario [] = [];
  public isLoading:boolean=false;


  constructor(private route:Router, private usuarioservices:UsuarioService){

    if(this.usuarioservices.estoyLogueado()){
      //Si ya esta logueado, reenvia a bienvenida
      route.navigateByUrl('/principal/bienvenida');
    }
  }

  public login(){
    // //cargamos la lista desde el local storage
    // this.listaUsuario = JSON.parse(localStorage.getItem('usuarios') || '[]');
    // //verificamos credenciales
    // if(this.listaUsuario.filter(t=> t.nombre.toLowerCase == this.usuario.nombre.toLowerCase && t.password == this.usuario.password ).length == 1){

    //   //guardamos usuario logueado
    //   localStorage.setItem('usuarioLogueado', JSON.stringify(this.listaUsuario.filter(t=> t.nombre.toLowerCase == this.usuario.nombre.toLowerCase && t.password == this.usuario.password )[0]));
    


    
    this.isLoading = true; // Mostrar el indicador de carga  
    this.usuarioservices.loginAPI(this.usuario).subscribe(
      x=>{
        
        

        if((<Usuario>x).usuario !=null)

          this.isLoading = false;

          {
            if((<Usuario>x).autorizado == false){ //Si el usuario no esta habilitado, no se loguea
              alert("Su usuario aun no esta habilitado. Por favor contactarse con un administrador");
            } else {
              this.usuarioservices.setLogueadoXApi(<Usuario>x);

            //Guardamos en el local storage el usuario logueado
            localStorage.setItem('usuarioLogueado',JSON.stringify(<Usuario>x));
            

            //pasar a la pagina de bienvenida
            this.route.navigateByUrl('/principal/bienvenida');
            }

            
            
          }
      }
    )
    this.usuarioservices.estoyLogueado();
    this.isLoading = false;
  }


}

