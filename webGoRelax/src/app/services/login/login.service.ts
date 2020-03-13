import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Subject, Observer, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuarioLogeado:boolean=false;
  dataLogeado= [];

  isLogginUser$ = new Subject<any>();

  URL:any= "http://192.168.0.4:8089/api/";
  //URL:any= " http://www.dsige.com/WebApi_GoRelax/api/";

  constructor(private http:HttpClient) {
 
  }
         //-----creando el observable --

  updateLoginNameStatus(status: boolean,user: string ) {
    var objSesion = {
      'status':status,
      'name':user
    }
    this.isLogginUser$.next(objSesion);
  }  

  get_iniciarSesion(nombreUsuario:string , contrasenia:string){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '3');
    parametros = parametros.append('filtro', nombreUsuario + '| ' + contrasenia );
    return this.http.get(this.URL + 'Registro' , {params: parametros})
               .pipe(map((res:any)=>{        

                    if (res.ok ==true || res.ok == 'true' ) {                        
                      let infoUser = {
                        id_usuario:res.data[0].id_usuario,
                        nombre_usuario : res.data[0].nombre_usuario
                      }                      
                      this.guardarSesion(infoUser);

                      return res;
                    }else{
                      return res;
                    }
               }));
  }

  public guardarSesion(data:any){
    this.usuarioLogeado =true;
    this.updateLoginNameStatus(true,data.nombre_usuario );
    localStorage.setItem('data_GoRelax_usuario', JSON.stringify(data));
  }

  leerSesion(){    
   // si es que existe una  variable creada en el local storage, leemos su valor
    if (localStorage.getItem('data_GoRelax_usuario')) { 
      this.usuarioLogeado =true;
      this.dataLogeado =  JSON.parse(localStorage.getItem("data_GoRelax_usuario"));
      this.updateLoginNameStatus(true,this.dataLogeado['nombre_usuario'] );
    }else{  
      this.usuarioLogeado =false;
      this.dataLogeado = [];
      this.updateLoginNameStatus(false,'');
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
