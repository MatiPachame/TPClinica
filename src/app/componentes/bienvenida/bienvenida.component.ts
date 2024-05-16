import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Usuario } from '../../entidades/usuario';

@Component({
    selector: 'app-bienvenida',
    standalone: true,
    templateUrl: './bienvenida.component.html',
    styleUrl: './bienvenida.component.css',
    imports: [MenuComponent]
})
export class BienvenidaComponent {
    
}
