import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-principal',
    standalone: true,
    imports: [RouterModule, MenuComponent],
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css',
    
})
export class PrincipalComponent {

}
