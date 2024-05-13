import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { RouterModule } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-principal',
    standalone: true,
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css',
    imports: [RouterModule, MenuComponent, LoadingComponent, FormsModule]
})
export class PrincipalComponent {
    
}
