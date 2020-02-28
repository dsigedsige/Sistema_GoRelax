import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  URL:any= "http://192.168.0.4:8089/api/";
  //URL:any= " http://www.dsige.com/WebApi_GoRelax/api/";
  
  constructor(private http:HttpClient) {
    
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


}
