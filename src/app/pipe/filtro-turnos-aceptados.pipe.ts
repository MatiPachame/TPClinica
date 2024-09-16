import { Pipe, PipeTransform } from '@angular/core';
import { Disponibilidad } from '../clases/disponibilidad';

@Pipe({
  name: 'filtroTurnosAceptados',
  standalone: true
})
export class FiltroTurnosAceptadosPipe implements PipeTransform {

  transform(turnos: Disponibilidad[]): Disponibilidad[] {
    // Filtrar los turnos que están pendientes
    return turnos.filter(turno => turno.aceptado === "Aceptado");
  }

}
