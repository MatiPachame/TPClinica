import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../entidades/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import Compressor from 'compressorjs';
//const Compressor = require('compressorjs');

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  

  listaUsuarios:Usuario[] = [];
  public usuario:Usuario = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 1,especialidad:'', dias_atencion:[],
  horario_desde:0,horario_hasta:0,especialidad_foto:null, perfil_foto:null, autorizado: true};
  public password2:string = '';
  

  constructor(public router:Router,private us:UsuarioService,private ngZone:NgZone){
  }

  diasSemana: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

  toggleDiaAtencion(dia: string) {

    if(this.usuario.dias_atencion != undefined){
      const index = this.usuario.dias_atencion.indexOf(dia);
    if (index === -1) {
      this.usuario.dias_atencion.push(dia);
    } else {
      this.usuario.dias_atencion.splice(index, 1);
    }
    }
    
  }

  subirFoto(event: Event, tipo: 'especialidad_foto' | 'perfil_foto') {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    // if (file) {
    //     new Compressor(file, {
    //         quality: 0.6, // Ajusta la calidad de compresión (0-1)
    //         success: (compressedResult: Blob) => {
    //             const reader = new FileReader();
    //             reader.onload = (e: ProgressEvent<FileReader>) => {
    //                 const result = e.target?.result as string;
    //                 if (tipo === 'especialidad_foto') {
    //                     this.usuario.especialidad_foto = result;
    //                 } else if (tipo === 'perfil_foto') {
    //                     this.usuario.perfil_foto = result;
    //                 }
    //             };
    //             reader.readAsDataURL(compressedResult);
    //         },
    //         error(err: Error) {
    //             console.log(err.message);
    //         },
    //     });
    // }

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result as string;
          if (tipo === 'especialidad_foto') {
              this.usuario.especialidad_foto = result;
          } else if (tipo === 'perfil_foto') {
              this.usuario.perfil_foto = result;
          }
      };
      reader.readAsDataURL(file);
  }

}


  validarExiste(){
    return this.us.listaUsuario.filter(t=> t.nombre.toLowerCase() == this.usuario.nombre.toLowerCase()).length == 1;
  }

  passwordCoinciden():boolean{
    return this.usuario.password === this.password2;
  }

  CamposLlenos() {
    return this.usuario.nombre && this.usuario.apellido && this.usuario.mail && this.usuario.usuario  && this.password2 && this.usuario.password === this.password2;
  }

  public registrar(){

    if(this.CamposLlenos()){

      if(this.usuario.tipo_usuario == 2 || 3){
        this.usuario.autorizado = false;
        
      } 

     
        

      this.us.registrarEnApi(this.usuario).subscribe(

        x=>{
          console.log(x);
          localStorage.setItem('usuarioLogueado',JSON.stringify(<Usuario>x));
  
          alert("Usuario creado exitosamente!")

          this.ngZone.run(() => {
          this.router.navigateByUrl('/principal/login');
        });

        
        
      })


    } else {
      alert('Por favor, complete todos los campos y asegúrese de que las contraseñas coincidan.');
    }

    // this.us.listaUsuario.push(this.usuario);
    // localStorage.setItem('usuarios',JSON.stringify(this.us.listaUsuario));
    // this.us.listaUsuario=JSON.parse(JSON.stringify(this.us.listaUsuario));
  
  }

}
