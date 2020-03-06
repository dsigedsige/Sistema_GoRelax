import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams , HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicarI } from '../../model/publicar.interface'; 
import { map } from  'rxjs/operators';
import { InputFileI } from '../../model/inputfile.interface';

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
    return this.http.post(this.URL + 'tblAnuncio', JSON.stringify(obj) ,  httpOptions);
  }

  saveTarifas(objTarifa:any[]){
    return this.http.post(this.URL + 'Publicar', JSON.stringify(objTarifa) ,  httpOptions);
  }

  saveHorarios(objHorario:any[]){
   return this.http.post(this.URL + 'Publicar/post_horarioAnuncio', JSON.stringify(objHorario) ,  httpOptions);
  }


  //-----carga de imagenes ------ 
  upload(file:any, objMultimedia:any) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('objMultimedia',  JSON.stringify(objMultimedia));

    return this.http.post<any>(this.URL + 'Uploads', formData);
  }


}
