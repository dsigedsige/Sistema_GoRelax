import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams , HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicarI } from '../../model/publicar.interface'; 

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}
 

@Injectable({
  providedIn: 'root'
})
export class PublicarService {

  URL:any= "http://192.168.0.4:8089/api/";
  //URL:any= " http://www.dsige.com/WebApi_GoRelax/api/";

  constructor(private http:HttpClient) { }

  getCategorias():Observable<any>{
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '1');
    parametros = parametros.append('filtro', '');

    return this.http.get(this.URL + 'Publicar' , {params: parametros});
  }

  getDepartamento(){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '2');
    parametros = parametros.append('filtro', '');

    return this.http.get(this.URL + 'Publicar' , {params: parametros});
  }
  
  getDistrito(idDepartamento){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '3');
    parametros = parametros.append('filtro', idDepartamento);

    return this.http.get(this.URL + 'Publicar' , {params: parametros});
  }
  getNacionalidad(){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '4');
    parametros = parametros.append('filtro', '');

    return this.http.get(this.URL + 'Publicar' , {params: parametros});
  }
  getCaracateristicas(idGrupo:string){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '5');
    parametros = parametros.append('filtro', idGrupo);

    return this.http.get(this.URL + 'Publicar' , {params: parametros});
  }
  saveAnuncios(obj:PublicarI){
    console.log(JSON.stringify(obj))
    return this.http.post(this.URL + 'tblAnuncio', JSON.stringify(obj) ,  httpOptions);
  }
  saveTarifas(objTarifa:any[]){
    JSON.stringify(objTarifa)
    return this.http.post(this.URL + 'Publicar', JSON.stringify(objTarifa) ,  httpOptions);
  }
  saveHorarios(objHorario:any[]){
    JSON.stringify(objHorario)
   return this.http.post(this.URL + 'Publicar/post_horarioAnuncio', JSON.stringify(objHorario) ,  httpOptions);
  }
  //-----carga de imagenes ------ 
  upload(file:any, objMultimedia:any) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('objMultimedia',  JSON.stringify(objMultimedia));

    return this.http.post<any>(this.URL + 'Uploads', formData);
  }
  
  //----caracteristicas---
  saveCaracteristicas(obj:any[]){
    console.log(JSON.stringify(obj));
    return this.http.post(this.URL + 'Publicar/post_caracteristicaAnuncio', JSON.stringify(obj) ,  httpOptions);
  }

  getServicios(){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '6');
    parametros = parametros.append('filtro', '');

    return this.http.get(this.URL + 'Publicar' , {params: parametros});
  }
  
  ///-----servicios servicios especiales
  saveServicios(obj:any[]){
    return this.http.post(this.URL + 'Publicar/post_serviciosAnuncio', JSON.stringify(obj) ,  httpOptions);
  }

  saveLugarEncuentro(obj:any[]){ 
    return this.http.post(this.URL + 'Publicar/post_lugarAnuncio', JSON.stringify(obj) ,  httpOptions);
  }

  saveCoordenadas(idAnuncio:number,  latiud:number ,longitud: number){ 
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '7');
    parametros = parametros.append('filtro', idAnuncio + '|' +  latiud + '|' + longitud);

    return this.http.get(this.URL + 'Publicar' , {params: parametros});
  }

  verificarMultimedia(idAnuncio:number, tipoArchivo:string){ 
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '8');
    parametros = parametros.append('filtro', idAnuncio + '|' +  tipoArchivo);

    return this.http.get(this.URL + 'Publicar' , {params: parametros});
  }

  getEdicionPublicacion(idAnuncio:string){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '4');
    parametros = parametros.append('filtro', idAnuncio);

    return this.http.get(this.URL + 'tblAnuncio' , {params: parametros});
  }

  deleteItemMultimedia(idGaleriaAnuncio:string){ 
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '9');
    parametros = parametros.append('filtro', idGaleriaAnuncio);

    return this.http.get(this.URL + 'Publicar' , {params: parametros});
  }

  ///------- listado de publicaciones ------

  get_listadoPublicaciones(idUsuario:number, pageindex:number, pageSise:number){ 
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '10');
    parametros = parametros.append('filtro', idUsuario+'|'+pageindex + '|' + pageSise);

    return this.http.get(this.URL + 'Publicar' , {params: parametros});
  }

}
