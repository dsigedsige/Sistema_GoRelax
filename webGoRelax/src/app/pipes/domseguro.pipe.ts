import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  constructor( private domSanitizer : DomSanitizer){
  }
 //---- sirve para ejecutar videos en la pagina
  transform(value: string): any {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
