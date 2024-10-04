import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../entidades/usuario';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { LoadingComponent } from "../loading/loading.component";
import { CommonModule } from '@angular/common';
import { jwtDecode, JwtPayload } from "jwt-decode";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule, RouterModule, LoadingComponent, CommonModule]
})
export class LoginComponent {
  public usuario:Usuario = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:1};
  public data:Usuario = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:1};
  public listaUsuario:Usuario [] = [];
  public isLoading:boolean=false;


  constructor(private route:Router, private usuarioservices:UsuarioService){

    if(this.usuarioservices.estoyLogueado()){
      //Si ya esta logueado, reenvia a bienvenida
      route.navigateByUrl('/principal/bienvenida');
    }
  }

  public login(){
   
    this.isLoading = true; // Mostrar el indicador de carga  
    this.usuarioservices.loginAPI(this.usuario).subscribe(
      x=>{
        this.isLoading = false;
        if(x == null){
          alert("Usuario/contraseña incorrecta");
        } else {
          //Decodifica el token
        var decode = jwtDecode<any>(x.toString());

        console.log(decode);

        //Verificamos que haya un usuario dentro del token
        if(decode.data.usuario !=null) {


          
          this.isLoading = false;
            if(decode.data.autorizado == 0){ //Si el usuario no esta habilitado, no se loguea
              alert("Su usuario aun no esta habilitado. Por favor contactarse con un administrador");
            } else {
            // this.usuarioservices.setLogueadoXApi(<Usuario>x)
            
            //Guardamos el token recibido en el Local Storage
            localStorage.setItem("UsuarioToken",x.toString());;
            
            //Si esta autorizado, redirige a bienvenida
            this.usuarioservices.setLogueado();
            
            //pasar a la pagina de bienvenida
            this.route.navigateByUrl('/bienvenida');
            }

        }
        }

        
                     
            
      }
    )
    this.usuarioservices.estoyLogueado();
    this.isLoading = false;
  }


}

