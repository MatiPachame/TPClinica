import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quitarusados',
  standalone: true
})
export class QuitarusadosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
