import { Injectable } from '@angular/core';
import { Subject, Observer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuarioLogeado:boolean=false;
  dataLogeado= [];
  isLoggedIn$ = new Subject<boolean>();

  constructor() {
 
  }
         //-----creando el observable --
  getLoginStatus() {
    return this.isLoggedIn$;
  }
  updateLoginStatus(status: boolean) {
    this.isLoggedIn$.next(status);
  }  

  public guardarSesion(data:any){
    this.usuarioLogeado =true;
    this.updateLoginStatus(true);
    localStorage.setItem('data_GoRelax_usuario', JSON.stringify(data));
  }

  leerSesion(){    
   // si es que existe una  variable creada en el local storage, leemos su valor
    if (localStorage.getItem('data_GoRelax_usuario')) { 
      this.usuarioLogeado =true;
      this.dataLogeado =  JSON.parse(localStorage.getItem("data_GoRelax_usuario"));
      this.updateLoginStatus(true);;
    }else{  
      this.usuarioLogeado =false;
      this.dataLogeado = [];
      this.updateLoginStatus(false);
    }
  } 

  logOut(){
    this.usuarioLogeado= false;
    localStorage.removeItem('data_GoRelax_usuario');
  }

  getSession(){
    if (localStorage.getItem('data_GoRelax_usuario')) { 
      this.dataLogeado =  JSON.parse(localStorage.getItem("data_GoRelax_usuario"));
    }else{
      this.dataLogeado = [];
    }
    return   this.dataLogeado['id_usuario'] ;
  }

 

}
