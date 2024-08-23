import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Usuario } from '../../entidades/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';
import { PasstopdfService } from '../../servicios/passtopdf.service';

@Component({
    selector: 'app-administrar-medicos',
    standalone: true,
    templateUrl: './administrar-medicos.component.html',
    styleUrl: './administrar-medicos.component.css',
    imports: [MenuComponent, CommonModule]
})
export class AdministrarMedicosComponent {
    

    public listMedicos: Usuario = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 1,especialidad:'', dias_atencion:[],
    horario_desde:0,horario_hasta:0,especialidad_foto:null, perfil_foto:null, autorizado: 1};
    public medicos:Usuario [] = [];
    public medicosAutorizar:boolean=false;



    constructor(private usuarioservices:UsuarioService, private passtopdfService: PasstopdfService) {
        
        this.usuarioservices.GetUsuariosAutorizar(this.medicos).subscribe(
            x=> {

                if((<Usuario[]>x).length >=1){
                    console.log("Se han encontrado medicos/admins", x);
                    this.medicos = Object.assign([], x);
                
            }
        });
    }

    public autorizar(medico:Usuario){
        let usuarioAutorizar = medico;

        usuarioAutorizar.autorizado = 1;
        console.log("Usuario autorizado:", usuarioAutorizar)
        this.usuarioservices.AutorizacionUsuario(usuarioAutorizar).subscribe(
            x=>{

                alert("Usuario autorizado correctamente");

            }
        );
            
    }

    public Desautorizar(medico:Usuario){
        let usuarioAutorizar = medico;

        usuarioAutorizar.autorizado = 0;
        this.usuarioservices.AutorizacionUsuario(usuarioAutorizar).subscribe(
            x=>{

                alert("Usuario desautorizado correctamente"); 
                
            }
        );
            
    }

    public exportAsPDF(divId: string) {
        this.passtopdfService.listamedPDF(this.medicos);
      }

}


