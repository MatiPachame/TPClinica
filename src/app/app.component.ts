import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { BienvenidaComponent } from "./componentes/bienvenida/bienvenida.component";
import { MenuComponent } from "./componentes/menu/menu.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, BienvenidaComponent, MenuComponent, CommonModule]
})
export class AppComponent {
  title = 'tpclinica';
  
}
