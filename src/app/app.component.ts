import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BienvenidaComponent } from "./componentes/bienvenida/bienvenida.component";
import { MenuComponent } from "./componentes/menu/menu.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, BienvenidaComponent, MenuComponent]
})
export class AppComponent {
  title = 'tpclinica';
}
