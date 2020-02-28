import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BienvenidaService {

  mayorEdad="N";
  showMenu=false;

  constructor() {
    this.leerBienvenida();
   }


  leerBienvenida(){    
    // si es que existe una  variable creada en el local storage, leemos su valor
    if (localStorage.getItem('mayorEdad')) {
      this.mayorEdad = localStorage.getItem('mayorEdad');
      this.showMenu=true;  
    }else{
      this.mayorEdad ="N"
      this.showMenu=false;  
    }
    return  {
      mayorEdad : this.mayorEdad,
      showMenu : this.showMenu
    }
  }

  guardarToken(mayorEdad:string){
    // crear una variable en el local storage
     localStorage.setItem('mayorEdad', mayorEdad);
  }  


}
