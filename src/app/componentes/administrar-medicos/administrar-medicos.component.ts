import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";

@Component({
    selector: 'app-administrar-medicos',
    standalone: true,
    templateUrl: './administrar-medicos.component.html',
    styleUrl: './administrar-medicos.component.css',
    imports: [MenuComponent]
})
export class AdministrarMedicosComponent {

}
