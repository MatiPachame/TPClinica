import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Usuario } from '../../entidades/usuario';
import { LoadingComponent } from '../loading/loading.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-bienvenida',
    standalone: true,
    templateUrl: './bienvenida.component.html',
    styleUrl: './bienvenida.component.css',
    imports: [RouterModule, MenuComponent, LoadingComponent, FormsModule]
})
export class BienvenidaComponent {
    
}
