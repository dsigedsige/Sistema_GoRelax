import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  //URL:any= "http://192.168.0.4:8089/api/";
  URL:any= " http://www.dsige.com/WebApi_GoRelax/api/";

 
  constructor(private http:HttpClient) {

   }

  
  getObtenerAnuncios(idTipoAnuncio:string, pageindex:number, pageSise:number){

    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '1');
    parametros = parametros.append('filtro', idTipoAnuncio+'|'+pageindex + '|' + pageSise);

    return this.http.get(this.URL + 'tblAnuncio' , {params: parametros});
  }

  getObtenerAnuncioID(idAnuncio:string){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '2');
    parametros = parametros.append('filtro', idAnuncio);
    
    return this.http.get(this.URL + 'tblAnuncio' , {params: parametros});

  }

  getCategorias(){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '3');
    parametros = parametros.append('filtro', '');
    
    return this.http.get(this.URL + 'tblAnuncio' , {params: parametros});

  }


}
