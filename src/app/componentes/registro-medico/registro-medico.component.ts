import { Component, NgZone } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { Medico } from '../../entidades/medico';
import { Usuario } from '../../entidades/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-medico',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registro-medico.component.html',
  styleUrl: './registro-medico.component.css'
})
export class RegistroMedicoComponent {

  listaUsuarios:Usuario[] = [];
  public medico:Medico = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 2, especialidad:'', dias_atencion:[],
                          horario_atencion:'',especialidad_foto:null, perfil_foto:null };
  public password2:string = '';

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
    return this.us.listaUsuario.filter(t=> t.nombre.toLowerCase() == this.medico.nombre.toLowerCase()).length == 1;
  }

  passwordCoinciden():boolean{
    return this.medico.password === this.password2;
  }

  CamposLlenos() {
    return this.medico.nombre && this.medico.apellido && this.medico.mail && this.medico.usuario  && this.password2 && this.medico.password === this.password2;
  }

  vaciarCampos(){
    this.medico.nombre='';
    this.medico.apellido='';
    this.medico.mail='';
    this.medico.usuario='';
    this.medico.password='';
    this.medico.especialidad='';
    this.medico.dias_atencion=[];
    this.medico.horario_atencion='';
    this.medico.especialidad_foto=null;
    this.medico.perfil_foto=null;

  }

  

  public registrar(){

    if(this.CamposLlenos()){

      this.us.registrarEnApi(this.medico).subscribe(

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
