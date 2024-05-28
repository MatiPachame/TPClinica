import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Usuario } from '../../entidades/usuario';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
    selector: 'app-administrar-medicos',
    standalone: true,
    templateUrl: './administrar-medicos.component.html',
    styleUrl: './administrar-medicos.component.css',
    imports: [MenuComponent]
})
export class AdministrarMedicosComponent {
    
    public medicos:Usuario [] = [];
    public medicosAutorizar:boolean=false;



    constructor(private usuarioservices:UsuarioService) {
        
        this.usuarioservices.autorizarMedicos(this.medicos).subscribe(
            x=>{



            }
        )
    }

}
