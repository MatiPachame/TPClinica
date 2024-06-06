import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Usuario } from '../../entidades/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-administrar-medicos',
    standalone: true,
    templateUrl: './administrar-medicos.component.html',
    styleUrl: './administrar-medicos.component.css',
    imports: [MenuComponent, CommonModule]
})
export class AdministrarMedicosComponent {
    

    public listMedicos: Usuario = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 1,especialidad:'', dias_atencion:[],
    horario_desde:0,horario_hasta:0,especialidad_foto:null, perfil_foto:null, autorizado: true};
    public medicos:Usuario [] = [];
    public medicosAutorizar:boolean=false;



    constructor(private usuarioservices:UsuarioService) {
        
        this.usuarioservices.autorizarMedicos(this.medicos).subscribe(
            x=> {

                if((<Usuario[]>x).length >=1){
                    console.log("Se han encontrado medicos/admins");
                    this.medicos = Object.assign([], x);
                
            }
        });
    }

}
