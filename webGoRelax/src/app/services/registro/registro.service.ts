import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { LoginService } from '../login/login.service';

import { map } from 'rxjs/operators'; 


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegistroService {


  URL:any= "/api/";

  // URL:any= "http://192.168.0.4:8089/api/";
  //URL:any= " http://www.dsige.com/WebApi_GoRelax/api/";
  
  constructor(private http:HttpClient, private loginService:LoginService) {
    
   }

  enviandoCorreo(email:string){
    let parametros = new HttpParams();
    parametros = parametros.append('email', 'elizabeth_chera@gmail.com');
 
    return this.http.post(this.URL + 'Registro?email=' + email  ,   httpOptions);

  }

  get_verificarCodigo(codigoVerificar:string){

    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '1');
    parametros = parametros.append('filtro', codigoVerificar );

    return this.http.get(this.URL + 'Registro' , {params: parametros});
  }

  get_actualizarRegistro(idusuario:number, nombreUsuario:string , contrasenia:string){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '2');
    parametros = parametros.append('filtro', idusuario + '| ' + nombreUsuario + '| ' + contrasenia );


    let infoUser = {
      id_usuario:idusuario,
      nombre_usuario : nombreUsuario
    }

    return this.http.get(this.URL + 'Registro' , {params: parametros})
               .pipe(map((res:any)=>{              
                    if (res.ok ==true || res.ok == 'true' ) {                         
                      this.loginService.guardarSesion(infoUser);
                      return res;
                    }else{
                      return res;
                    }
               }));
  }






}
