import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../entidades/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Medico } from '../../entidades/medico';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  

  listaUsuarios:Usuario[] = [];
  public usuario:Usuario = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 1};
  public password2:string = '';
  public medico:Medico = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 2, especialidad:'', dias_atencion:[],
                          horario_atencion:'',especialidad_foto:null, perfil_foto:null };
  

  constructor(public router:Router,private us:UsuarioService,private ngZone:NgZone){
    this.listaUsuarios =JSON.parse(localStorage.getItem('usuarios') || "[]");
  }

  diasSemana: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

  toggleDiaAtencion(dia: string) {
    const index = this.medico.dias_atencion.indexOf(dia);
    if (index === -1) {
      this.medico.dias_atencion.push(dia);
    } else {
      this.medico.dias_atencion.splice(index, 1);
    }
  }

  onFileChange(event: any, tipo: 'especialidad_foto' | 'perfil_foto') {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (tipo === 'especialidad_foto') {
          this.medico.especialidad_foto = e.target.result;
        } else if (tipo === 'perfil_foto') {
          this.medico.perfil_foto = e.target.result;
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

  vaciarCampos(){
    this.usuario.nombre='';
    this.usuario.apellido='';
    this.usuario.mail='';
    this.usuario.usuario='';
    this.usuario.password='';
  }

  public registrar(){

    if(this.CamposLlenos()){

      if{
        
      }

      if(this.usuario.tipo_usuario==2){
        this.medico= {nombre: this.usuario.nombre,
           apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 2, especialidad:'', dias_atencion:[],
        horario_atencion:'',especialidad_foto:null, perfil_foto:null };
      }

      this.us.registrarEnApi(this.usuario).subscribe(

        x=>{
          console.log(x);
          this.vaciarCampos();
  
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
