import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtergroup'
})
export class FiltergroupPipe implements PipeTransform {

  transform(caracteristicas: any, igGrupo:number): any {

    var caracteristicasFilter= [];
    for(let obj of caracteristicas ){
      if (obj.Grupo == igGrupo){
        caracteristicasFilter.push(obj);
      } 
    }
    return caracteristicasFilter;
  }

}
