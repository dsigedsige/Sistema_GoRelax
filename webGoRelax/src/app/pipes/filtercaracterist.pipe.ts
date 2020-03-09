import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtercaracterist'
})
export class FiltercaracteristPipe implements PipeTransform {

  transform(carateristicas:any[], idGrupo:number): any {

    var caracteriticasNew = [];
    for (let caract of carateristicas) {
        if (caract.grupo_caracteristica == idGrupo ) {
          caracteriticasNew.push(caract);
        }
    }
    return caracteriticasNew;
  }

}
