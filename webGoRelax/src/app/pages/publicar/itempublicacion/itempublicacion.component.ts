import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { PublicarService } from '../../../services/publicar/publicar.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertasService } from '../../../services/alertas/alertas.service';
import { LoginService } from '../../../services/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InputFileI } from 'src/app/model/inputfile.interface';
import { markerI } from 'src/app/model/market.interface';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import Swal from 'sweetalert2'

declare var $:any;
@Component({
  selector: 'app-itempublicacion',
  templateUrl: './itempublicacion.component.html',
  styleUrls: ['./itempublicacion.component.css']
})
export class ItempublicacionComponent implements OnInit {

  formParams : FormGroup;
  formParamsTarifa : FormGroup;
  formParamsHorario : FormGroup;
  formParamsMultimedia : FormGroup;
  formParamsCaracteristica : FormGroup;
 

  categorias:any = [];
  departamentos:any = [];
  distritos:any = [];
  edades:any = [];

  nacionalidades= [];
  pieles:any[] = [];
  cabellos:any[] = [];
  estaturas:any[] = [];
  cuerpos:any[] = [];
  pechos:any[] = [];
  pubis:any[] = [];

  servicios:any[] = [];
  idUserGlobal=0;
  idAnuncioGlobal=0;
  mytime: Date = new Date();

  opcionHorario:any = [];
  tarifas:any[] = [];
  horarios:any[] = [];
  flagAllDias=true;
  dia="";
 
  files:InputFileI[] = [];
  filesVideos:InputFileI[] = [];

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  flag_edicion=false;

  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  constructor(private  publicarService:PublicarService,  private spinner: NgxSpinnerService, private alertasService:AlertasService, 
              private loginService: LoginService,private router:Router,private chRef: ChangeDetectorRef, private fb: FormBuilder,  
              private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private activatedRoute: ActivatedRoute ) {   
                
    //---obteniendo el id del usuario, verificando si esta logeasdo ----
    this.idUserGlobal = this.loginService.getSession();

    if ( !this.idUserGlobal) {   
      this.router.navigateByUrl('/home');
      return;
    }

   //---obtener el parametro que viene por la url
    let urlValor = this.activatedRoute.snapshot.paramMap.get('id_anuncio');

    if (isNaN(Number(urlValor))) {
      this.router.navigateByUrl('/home');
      return;
    }

    if (Number(urlValor) == 0) { ///---nuevo 
      this.idAnuncioGlobal =0; 
      this.flag_edicion =false;
      console.log('nuevo')
    }else{  //----edicion
      this.idAnuncioGlobal = Number(urlValor); 
      this.flag_edicion =true;
      console.log('Editar')
    }
    //--------------/


    ///----Formularios , combos, listas etc----
    this.getInicializandoDatos();
    this.getInicializandoFormulariosEdicion();
  }

  ngOnInit() { 
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {  
      this.setCurrentLocation(); 
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          } 
 
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.address = place.formatted_address;
          this.zoom = 12;
        });
      });
    });
  }

  getInicializandoDatos(){
    this.inicializarFormularioAnuncio();
    this.inicializarFormularioTarifa();
    this.inicializarFormularioHorarios();
    this.inicializarFormularioMultimedia();
    this.inicializarFormularioCaracteristica();

    this.getCategorias();
    this.getDepartamento();
    this.getEdad();
    this.getOpcionHorario();

    this.getNacionalidad();
    this.getPieles();
    this.getCabellos();
    this.getEstatura();
    this.getCuerpos();
    this.getPechos();
    this.getPubis();
    this.getServicios();
  }

  getInicializandoFormulariosEdicion(){
    if ( this.flag_edicion == true) {  //// EDITAR  
      Swal.fire({
        title: 'Sistemas',
        text: 'Por favor espere ...',
        icon: 'info',
      })
      Swal.showLoading(); 
     this.publicarService.getEdicionPublicacion(String(this.idAnuncioGlobal))
          .subscribe(
            (res:any) => {  
 
              if (res.ok==true) {  

                console.log(res.data);              
                this.formParams.patchValue(
                  {
                      "id_Anuncio" : res.data.list_anuncio[0].id_Anuncio,
                      "id_Usuario" : res.data.list_anuncio[0].id_Usuario,
                      "email_usuario"  : res.data.list_anuncio[0].email_usuario,
                      "id_Categoria"  : res.data.list_anuncio[0].id_Categoria,
                      "CodigoPostal_Usuario "  : res.data.list_anuncio[0].CodigoPostal_Usuario,

                      "telefono_Anuncion"  : res.data.list_anuncio[0].telefono_Anuncion,
                      "id_Departemento"  : res.data.list_anuncio[0].id_Departemento,
                      "id_Distrito"  : res.data.list_anuncio[0].id_Distrito,
                      "titulo_anuncio"  : res.data.list_anuncio[0].titulo_anuncio,
                      "descripcion_anuncio"  : res.data.list_anuncio[0].descripcion_anuncio,
                      "nombre_anuncio"  : res.data.list_anuncio[0].nombre_anuncio,
                      "edad_anuncio"  : res.data.list_anuncio[0].edad_anuncio,

                      "audio_anuncio"  : res.data.list_anuncio[0].audio_anuncio,
                      "contactoWhatsapp"  : res.data.list_anuncio[0].contactoWhatsapp,
                      "estado"  : res.data.list_anuncio[0].estado,                      
                      "portada"  : res.data.list_anuncio[0].portada,
                      "tipo_Anuncio"  : res.data.list_anuncio[0].tipo_Anuncio,
                      "latitud_anuncio"  : res.data.list_anuncio[0].latitud_anuncio,
                      "longitud_anuncio"  : res.data.list_anuncio[0].longitud_anuncio
                  });

                  ///------TARIFAS-------

                  this.formParamsTarifa.patchValue({"id_Anuncio": this.idAnuncioGlobal,"descripcion_tarifa":  '', "precio_tarifa" : ''});
                  this.tarifas =[];

                  if (res.data.list_tarifa.length > 0) {             
                    this.tarifas = res.data.list_tarifa;  
                  }
                  
                  ///------ HORARIOS-------
                  if (res.data.list_horario.length > 0) {  

                    let descHorario =  res.data.list_horario[0].descripcion ;
                    this.flagAllDias = (descHorario.toLowerCase() == 'lunes a domingo') ? true : false;
  
                    if (this.flagAllDias ) { //// todos los dias
  
                      var cbo_si = (<HTMLInputElement>document.getElementById("cbo_si"))
                      cbo_si.value = "SI";
  
                      var hour = this.hora24Format(res.data.list_horario[0].horaInicial, 1)
                      var min = this.hora24Format(res.data.list_horario[0].horaInicial, 2)
                      let timeIni = this.horalFormat(Number(hour), Number(min));
  
                      var hour = this.hora24Format(res.data.list_horario[0].horaFinal, 1)
                      var min = this.hora24Format(res.data.list_horario[0].horaFinal, 2)       
                      let timeFin = this.horalFormat(Number(hour), Number(min)); 
                    
                      this.formParamsHorario.patchValue({"id_Anuncio": this.idAnuncioGlobal,"descripcion":  'Lunes a Domingo', "horaInicial" : timeIni, "horaFinal" :  timeFin});
                      
                    }else{
                      var cbo_si = (<HTMLInputElement>document.getElementById("cbo_si"))
                      cbo_si.value = "NO";
                      
                      this.horarios = [];
                      this.horarios = res.data.list_horario;
                    }  
                }
                  ///------FOTOS-------

                  this.formParamsMultimedia.patchValue({"id_Anuncio": this.idAnuncioGlobal}); 
                  this.files = [];

                   for (let foto of res.data.list_multimedia) {
                      if(foto.tipoArchivo_GaleriaAnuncio == 1){
                        this.files.push({
                          'id_GaleriaAnuncio' : foto.id_GaleriaAnuncio,
                          'file': null,
                          'namefile': foto.nombre_GaleriaAnuncio,
                          'urlfile' : foto.url_GaleriaAnuncio,
                          'portada' : 0,
                          'status': '',
                          'message': ''
                         })
                      }
                   }  
 
                     ///------ VIDEOS-------

                     for (let foto of res.data.list_multimedia) {
                      if(foto.tipoArchivo_GaleriaAnuncio == 2){
                        this.filesVideos.push({
                          'id_GaleriaAnuncio' : foto.id_GaleriaAnuncio,
                          'file': null,
                          'namefile':foto.nombre_GaleriaAnuncio,
                          'urlfile' : foto.url_GaleriaAnuncio,
                          'portada' : 0,
                          'status': '',
                          'message': ''
                         })
                      }
                   }  

                    ///------APARIENCIA-------     
                    
                if (res.data.list_apariencia.length > 0) {                  
                  this.formParamsCaracteristica.patchValue(
                    {
                      "id_CaracteristicaAnuncio" : res.data.list_apariencia[0].id_CaracteristicaAnuncio,
                      "id_Anuncio" : res.data.list_apariencia[0].id_Anuncio,
                      "id_Nacionalidad"  : res.data.list_apariencia[0].id_Nacionalidad,
                      "id_Piel": res.data.list_apariencia[0].id_Piel,            
                      "id_Cabello": res.data.list_apariencia[0].id_Cabello,
                      "id_Estatura" : Number(res.data.list_apariencia[0].id_Estatura),
                      "id_Cuerpo" : Number(res.data.list_apariencia[0].id_Cuerpo),
                      "id_Pechos": Number(res.data.list_apariencia[0].id_Pechos),
  
                      "id_Pubis" : Number(res.data.list_apariencia[0].id_Pubis), 
                      "atencion_Mujer" : res.data.list_apariencia[0].atencion_Mujer, 
                      "atencion_Parejas" : res.data.list_apariencia[0].atencion_Parejas, 
                      "atencion_Discapacitados" : res.data.list_apariencia[0].atencion_Discapacitados,                       
                      "atencion_Hombres" : res.data.list_apariencia[0].atencion_Hombres,
                      "medioPago_Efectivo" : res.data.list_apariencia[0].medioPago_Efectivo,
                      "medioPago_Tarjeta" : res.data.list_apariencia[0].medioPago_Tarjeta,            
                      "estado" :  res.data.list_apariencia[0].estado,
                    });
                }                    


               ///------SERVICIOS-------  

               for (let index = 0; index <   res.data.list_servicios.length; index++) {                   
                    for (let obj of this.servicios) {
                        if (obj.grupo_caracteristica == 8 || obj.grupo_caracteristica == 9 ) {
                          if ( obj.id_caracteristica  ==  res.data.list_servicios[index].id_servicio) {
                              obj.checkeado = true
                          }                  
                        }
                      }
                }
                 
                 ///------LUGAR DE ENCUENTRO-------  

               for (let index = 0; index <   res.data.list_lugar.length; index++) {                   
                for (let obj of this.servicios) {
                    if (obj.grupo_caracteristica == 10 ) {
                      if ( obj.id_caracteristica  ==  res.data.list_lugar[index].id_lugar) {
                          obj.checkeado = true
                      }                  
                    }
                  }
               }
  
              this.latitude = Number(res.data.list_anuncio[0].latitud_anuncio)
              this.longitude = Number(res.data.list_anuncio[0].longitud_anuncio)

              setTimeout(function() {
                    this.getAddress(this.latitude, this.longitude);
                    Swal.close();
              }.bind(this), 1000);               
     
    
              }else{
                alert('Error Horario :' + JSON.stringify(res.data));
                Swal.close();
              }                                         
            },
            error => {
              alert( 'Error Horario :' + JSON.stringify(error))
              Swal.close();
            },
          )
    }


  }

   // Get Current Location Coordinates
   private setCurrentLocation() { 
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      }, (error)=>{
        this.latitude = -12.0965997;
        this.longitude = -76.9695381;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  EliminarMultimedia(objMultimedia:any, opcion:number){
 

    if (!objMultimedia.file) {
      if (objMultimedia.id_GaleriaAnuncio > 0) {
        this.spinner.show();
        this.publicarService.deleteItemMultimedia(objMultimedia.id_GaleriaAnuncio)
            .subscribe((res:any)=>{
              this.spinner.hide();

              if (opcion ==1) { /// fotos 
                var pos = this.files.indexOf(objMultimedia);  // (pos) es la posición para abreviar
                this.files.splice( pos, 1 );
              }else { /// videos
                var pos = this.filesVideos.indexOf(objMultimedia);  // (pos) es la posición para abreviar
                this.filesVideos.splice( pos, 1 );
              }

             })
      } 
    }else{

      if (opcion ==1) { /// fotos 
        var pos = this.files.indexOf(objMultimedia);  // (pos) es la posición para abreviar
        this.files.splice( pos, 1 );
      }else { /// videos
        var pos = this.filesVideos.indexOf(objMultimedia);  // (pos) es la posición para abreviar
        this.filesVideos.splice( pos, 1 );
      }

    }

  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No se encontro resultados..');
        }
      } else {
        window.alert('Geocoder fallo ' + status);
      } 
    });
  }

  inicializarFormularioAnuncio(){
 
      this.formParams = new FormGroup({
        id_Anuncio : new FormControl(this.idAnuncioGlobal), 
        id_Usuario : new FormControl(this.idUserGlobal),  
        email_usuario : new FormControl(''),
        id_Categoria : new FormControl('0',[Validators.required]),
        CodigoPostal_Usuario : new FormControl(''),
        telefono_Anuncion : new FormControl('',[Validators.required]),
        id_Departemento : new FormControl('0',[Validators.required]),
        id_Distrito : new FormControl('0',[Validators.required]),
        titulo_anuncio : new FormControl('',[Validators.required]),
        descripcion_anuncio : new FormControl('',[Validators.required]),
        nombre_anuncio : new FormControl('',[Validators.required]),
        edad_anuncio : new FormControl('18'),
        audio_anuncio : new FormControl(''),
        contactoWhatsapp : new FormControl(''),
        estado  : new FormControl('1'),
        usuario_creacion  : new FormControl(this.idUserGlobal),
        fecha_creacion : new FormControl(''),
        portada : new FormControl(''),
        tipo_Anuncio : new FormControl('0'),
        latitud_anuncio : new FormControl(''),
        longitud_anuncio : new FormControl(''),
       })

  }

  inicializarFormularioTarifa(){
    this.formParamsTarifa = new FormGroup({
      id_tarifaAnuncio: new FormControl('0'), 
      id_Anuncio: new FormControl(this.idAnuncioGlobal), 
      descripcion_tarifa: new FormControl(''), 
      precio_tarifa: new FormControl(''), 
      estado: new FormControl('1'), 
      usuario_creacion: new FormControl(this.idUserGlobal) 
     })
  }

  inicializarFormularioHorarios(){
    let timeIni = this.horalFormat(24,0);
    let timeFin = this.horalFormat(23,59);

    this.formParamsHorario = new FormGroup({
      id_HorarioAnuncio: new FormControl('0'), 
      id_Anuncio: new FormControl(this.idAnuncioGlobal), 
      dia: new FormControl('Lunes'),
      descripcion: new FormControl(''), 
      horaInicial: new FormControl(timeIni), 
      horaFinal: new FormControl(timeFin), 
      estado: new FormControl('1'), 
      usuario_creacion: new FormControl(this.idUserGlobal) 
     })
  } 

  inicializarFormularioMultimedia(){
    this.formParamsMultimedia = new FormGroup({
      id_GaleriaAnuncio: new FormControl('0'), 
      id_Anuncio: new FormControl(this.idAnuncioGlobal), 
      nombre_GaleriaAnuncio: new FormControl(''), 
      tipoArchivo_GaleriaAnuncio: new FormControl(''), 
      estado: new FormControl('1'), 
      usuario_creacion: new FormControl(this.idUserGlobal) 
     })
  }

  inicializarFormularioCaracteristica(){
    this.formParamsCaracteristica = new FormGroup({
      id_CaracteristicaAnuncio: new FormControl('0'), 
      id_Anuncio: new FormControl(this.idAnuncioGlobal), 
      id_Nacionalidad: new FormControl('0'), 
      id_Piel: new FormControl('0'), 

      id_Cabello: new FormControl('0'), 
      id_Estatura: new FormControl(''), 
      id_Cuerpo: new FormControl(''), 
      id_Pechos: new FormControl(''), 

      id_Pubis: new FormControl(''), 
      atencion_Mujer: new FormControl(''), 
      atencion_Parejas: new FormControl(''), 
      atencion_Discapacitados: new FormControl(''), 


      atencion_Hombres: new FormControl(''), 
      medioPago_Efectivo: new FormControl(''), 
      medioPago_Tarjeta: new FormControl(''), 
 
      estado: new FormControl('1'), 
      usuario_creacion: new FormControl(this.idUserGlobal) 
     })
  }

 

  getCategorias(){
    this.spinner.show();
     this.publicarService.getCategorias()
         .subscribe((res)=>{
          this.spinner.hide();
          this.categorias = [];
          this.categorias = res;
         })
  }
  getDepartamento(){
    this.spinner.show();
     this.publicarService.getDepartamento()
         .subscribe((res)=>{
          this.spinner.hide();
          this.departamentos = [];
          this.departamentos = res;
         })
  }
  getEdad(){
    for (let index = 18; index <=70; index++) {
          this.edades.push(index) ;
    }
  }
  changeDepartamento_Distrito(idDepartamento:number){
    if (idDepartamento ==0) {
      return;
    }

    this.spinner.show();
     this.publicarService.getDistrito(idDepartamento)
         .subscribe((res)=>{
          this.spinner.hide();
          this.distritos = [];
          this.distritos = res;
         })
  }
  getNacionalidad(){
    this.spinner.show();
     this.publicarService.getNacionalidad()
         .subscribe((res:any)=>{
          this.spinner.hide();
          this.nacionalidades = [];
          this.nacionalidades = res;
         })
  }
  getPieles(){
    this.spinner.show();
     this.publicarService.getCaracateristicas('1')
         .subscribe((res:any)=>{
          this.spinner.hide();
          this.pieles = [];
          this.pieles = res;
         })
  }
  getCabellos(){
    this.spinner.show();
     this.publicarService.getCaracateristicas('2')
         .subscribe((res:any)=>{
          this.spinner.hide();
          this.cabellos = [];
          this.cabellos = res;
         })
  }
  getEstatura(){
    this.spinner.show();
     this.publicarService.getCaracateristicas('3')
         .subscribe((res:any)=>{
          this.spinner.hide();
          this.estaturas = [];
          this.estaturas = res;
         })
  }
  getCuerpos(){
    this.spinner.show();
     this.publicarService.getCaracateristicas('4')
         .subscribe((res:any)=>{
          this.spinner.hide();
          this.cuerpos = [];
          this.cuerpos = res;
         })
  }
  getPechos(){
    this.spinner.show();
     this.publicarService.getCaracateristicas('5')
         .subscribe((res:any)=>{
          this.spinner.hide();
          this.pechos = [];
          this.pechos = res;
         })
  }  
  getPubis(){
    this.spinner.show();
     this.publicarService.getCaracateristicas('6')
         .subscribe((res:any)=>{
          this.spinner.hide();
          this.pubis = [];
          this.pubis = res;
         })
  } 
  getServicios(){
    this.spinner.show();
     this.publicarService.getServicios()
         .subscribe((res:any)=>{
          this.spinner.hide();
          this.servicios = [];
          this.servicios = res;
         })
  } 
 
  saveAnuncios(){ 
    
      this.spinner.show();  
      this.publicarService.saveAnuncios(this.formParams.value)
      .subscribe(
        (res:any) => {   
          this.idAnuncioGlobal = res.id_Anuncio;                 

          //----- convirtiendo la publicacion en edicion-----
          this.router.navigateByUrl('/publicar/' +  this.idAnuncioGlobal);

          ///---- inicializando la variable del IdAnuncio-----------------------
          this.formParams.patchValue({"id_Anuncio": this.idAnuncioGlobal});
          this.formParamsTarifa.patchValue({"id_Anuncio": this.idAnuncioGlobal});
          this.formParamsHorario.patchValue({"id_Anuncio": this.idAnuncioGlobal});
          this.formParamsMultimedia.patchValue({"id_Anuncio": this.idAnuncioGlobal});          
          this.formParamsCaracteristica.patchValue({"id_Anuncio": this.idAnuncioGlobal});
 
          // ///---- Fin de inicializando la variable del IdAnuncio-----------------------
                this.saveTarifa();
                this.saveHorarios();
                this.saveMultimedia(1);
                this.saveMultimedia(2);
                this.saveApariencia();
                this.saveServicios();
                this.saveLugarEncuentro();
                this.saveUbicacion();    
                
                setTimeout(function() {
                  this.spinner.show();  
                 //----- inicializando el formulario-----
                 let timeIni = this.horalFormat(24,0);
                 let timeFin = this.horalFormat(23,59);
                 this.formParamsHorario.patchValue({"horaInicial": timeIni, "horaFinal":timeFin}); 
                  Swal.close();
                  this.spinner.hide();
                }.bind(this), 5000);       
                
        },
        error => {
          this.spinner.hide();
          this.idAnuncioGlobal = 0;
          alert('Error: Anuncio :'  + JSON.stringify(error))          
          console.log('error', error)
        },
      )  
    }

//  TARIFAS DE ANUNCIO

  agregarTarifa(){
    if (this.formParamsTarifa.value.descripcion_tarifa == null || this.formParamsTarifa.value.descripcion_tarifa == '' || this.formParamsTarifa.value.descripcion_tarifa == 0) {
      this.alertasService.Swal_alert('error','Ingrese la Descripción');
      return 
    }
    if (this.formParamsTarifa.value.precio_tarifa == null || this.formParamsTarifa.value.precio_tarifa == '' || this.formParamsTarifa.value.precio_tarifa == 0) {
      this.alertasService.Swal_alert('error','Ingrese una Tarifa');
      return 
    }

    this.tarifas.push(this.formParamsTarifa.value); 
   ///--- limpiando ----
    this.formParamsTarifa.patchValue({"descripcion_tarifa":  '', "precio_tarifa" : ''});
  }
  
  eliminarTarifa(tarifa){
    var pos = this.tarifas.indexOf(tarifa);  // (pos) es la posición para abreviar
    this.tarifas.splice( pos, 1 );
  }

  saveTarifa(){
    if (this.tarifas.length> 0) {   
     ////----actualizo el idAnuncio---
      for (let obj of this.tarifas) {
        obj.id_Anuncio = this.idAnuncioGlobal;
      }
      Swal.fire({
        title: 'Sistemas',
        text: 'Por favor espere ...',
        icon: 'info',
      })
      Swal.showLoading(); 
      this.publicarService.saveTarifas(this.tarifas)
          .subscribe(
            (res:any) => {
              console.log(res);
              if (res.ok==true) {               
                  
              }else{
                alert('Error: Tarifa :' + JSON.stringify(res.data));
              }                                         
            },
            error => {
              alert('Error: Tarifa :' + error)
            },
          )
    }
  }

// FIN DE TARIFAS DE ANUNCIO


 //  HORARIO DE TARIFAS

 getOpcionHorario(){ 
  this.opcionHorario.push({ id:'SI', des: 'SI'},
                          { id:'NO', des: 'NO' }
                          ) ; 
 }

 changeHorario(opcion){
   if (opcion.target.value =='SI') {
      this.flagAllDias=true;
   }else{
    this.flagAllDias=false;
   }
 }

 horalFormat(ini:number, fin:number){
  const timeIni = new Date();
  timeIni.setHours(ini);
  timeIni.setMinutes(fin);
  return timeIni;
 } 

 hora24Format(time,option){
  var hours = Number(time.match(/^(\d+)/)[1]);
  var minutes = Number(time.match(/:(\d+)/)[1]);

  var AMPM = time.match(/\s(.*)$/)[1];
  if(AMPM == "PM" && hours<12) hours = hours+12;
  if(AMPM == "AM" && hours==12) hours = hours-12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if(hours<10) sHours = "0" + sHours;
  if(minutes<10) sMinutes = "0" + sMinutes;

   return (option ==1) ? sHours : sMinutes;

 }

 formatAMPM(fecha:Date) {
  var time = new Date(fecha); 
  return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
 }

 agregarHorario(){

  if (this.formParamsHorario.value.horaInicial == null || this.formParamsHorario.value.horaInicial == '' || this.formParamsHorario.value.horaInicial == 0) {
    this.alertasService.Swal_alert('error','Seleccione o ingrese la Hora Inicial');
    return 
  }
  if (this.formParamsHorario.value.horaFinal == null || this.formParamsHorario.value.horaFinal == '' || this.formParamsHorario.value.horaFinal == 0) {
    this.alertasService.Swal_alert('error','Seleccione o ingrese la Hora Final');
    return 
  }

  if ( this.existenciaHorario(this.formParamsHorario.value.dia)==true) {
    this.alertasService.Swal_alert('error','Este dia ya se encuentra Registrado, verifique');
    return;
  } 

  //----almacenando la hora formateada para agregarlo al listado-----

  let HoraIniFormateado =   this.formatAMPM( this.formParamsHorario.value.horaInicial);
  let HoraFinFormateado =   this.formatAMPM( this.formParamsHorario.value.horaFinal);

  this.formParamsHorario.patchValue({"descripcion":  this.formParamsHorario.value.dia, "horaInicial" : HoraIniFormateado, "horaFinal" :  HoraFinFormateado});
  this.horarios.push(this.formParamsHorario.value)
 //-----
   //----- inicializando el formulario-----
   let timeIni = this.horalFormat(24,0);
   let timeFin = this.horalFormat(23,59);
   this.formParamsHorario.patchValue({"horaInicial": timeIni, "horaFinal":timeFin}); 
   console.log(this.horarios)

 }

 existenciaHorario(diaSelect){
   var existe =false;
   for (let dia of this.horarios) {
     if (dia.descripcion ==diaSelect) {
        existe =true;
        break;
     }
   }
   return existe
 }
 
 eliminarHorario(hora){
  var pos = this.horarios.indexOf(hora);  // (pos) es la posición para abreviar
  this.horarios.splice( pos, 1 );
 }

 saveHorarios(){
  if (this.flagAllDias) { /// opcion individual
    let HoraIniFormateado =   this.formatAMPM( this.formParamsHorario.value.horaInicial);
    let HoraFinFormateado =   this.formatAMPM( this.formParamsHorario.value.horaFinal);
  
    this.formParamsHorario.patchValue({"descripcion":  'Lunes a Domingo', "horaInicial" : HoraIniFormateado, "horaFinal" :  HoraFinFormateado});

    this.horarios= [];
    this.horarios.push(this.formParamsHorario.value);
 
    this.publicarService.saveHorarios(this.horarios)
        .subscribe(
          (res:any) => {
            if (res.ok==true) {               
                
            }else{
              alert('Error Horario :' + JSON.stringify(res.data));
            }                                         
          },
          error => {
            alert( 'Error Horario :' + JSON.stringify(error))
          },
        )

  }else{ //// opcion multiple de horas 

    if (this.horarios.length> 0) {  

      //----refrescando el IdAnuncio---
      for (let obj of this.horarios) {
        obj.id_Anuncio = this.idAnuncioGlobal;
      }
 
      this.publicarService.saveHorarios(this.horarios)
          .subscribe(
            (res:any) => {
              console.log(res);

              if (res.ok==true) {               
                  
              }else{
                alert('Error Horario :' + JSON.stringify(res.data));
              }                                         
            },
            error => {
              alert('Error Horario :' + JSON.stringify(error));
            },
          )
    }     
  }
}
       
 // FIN DE HORARIO DE TARIFAS



 ///--- MULTIMEDIA--

 onFileChange(event:any, opcion:number) {
   
  var filesTemporal = event.target.files; //FileList object
  
   if (opcion==1) {  //----fotos

    var fileFoto:InputFileI [] = []; 
    for (var i = 0; i < filesTemporal.length; i++) { //for multiple files          
      (function(file) {
          var name = file;
          var reader = new FileReader();  
          reader.onload = function(e) {                 
               let urlImage =e.target ;
               fileFoto.push({
                    'id_GaleriaAnuncio' : 0,
                    'file': name,
                    'namefile': name.name,
                    'urlfile' : urlImage['result'],
                    'portada' : 0,
                    'status': '',
                    'message': ''
                })  
          }
          reader.readAsDataURL(file);
      })(filesTemporal[i]);
    }
    // this.files = fileFoto;

    var fotoDatos = this.files ;
    this.files = fileFoto;

    //---añadiendo
    for (let fot of fotoDatos) {
      console.log('entro')
      this.files.push(fot);
    }
    console.log(this.files);  

   }else{ ///----videos    
    
      var fileVideo:InputFileI [] = []; 
      for (var i = 0; i < filesTemporal.length; i++) { //for multiple files          
          fileVideo.push({
            'id_GaleriaAnuncio' : 0,
            'file': filesTemporal[i],
            'namefile': filesTemporal[i].name,
            'portada' : 0,
            'urlfile' : "",
            'status': '',
            'message': ''
        })  
      }
      // this.filesVideos = fileVideo;
      var videoDatos = this.filesVideos ;
      this.filesVideos = fileVideo;
  
      //---añadiendo
      for (let vid of videoDatos) {
        this.filesVideos.push(vid);
      }
      console.log(this.filesVideos); 
   }  
 }

 saveMultimedia(tipoFile:number){
    //--tipoFile = 1 foto   tipoFile = 2 video
    var cant = (tipoFile==1) ? this.files.length  : this.filesVideos.length ;
  
    this.spinner.show(); 
    var enviarServidor = (index) => {
        if (cant == index) {
          this.spinner.hide(); 
            return;
        }                

        var fileMultimedia = (tipoFile==1) ? this.files[index].file   : this.filesVideos[index].file ;

        if (!fileMultimedia) { ////---validamos que sea un nuevo archivo
          enviarServidor(index+ 1); 
        }else{

          if (tipoFile ==1) {
            this.formParamsMultimedia.patchValue({"nombre_GaleriaAnuncio": this.files[index].file.name, "tipoArchivo_GaleriaAnuncio" : 1}); 
          }else{
            this.formParamsMultimedia.patchValue({"nombre_GaleriaAnuncio": this.filesVideos[index].file.name, "tipoArchivo_GaleriaAnuncio" : 2}); 
          }   

          this.publicarService.upload( fileMultimedia  , this.formParamsMultimedia.value).subscribe(
            (res) =>{
              if (res.ok==true) {
                if (tipoFile ==1) {
                  this.files[index].message = 'Carga Ok 100%';
                  this.files[index].status = 'ok';
                } else {
                  this.filesVideos[index].message = 'Carga Ok 100%';
                  this.filesVideos[index].status = 'ok';
                }
                enviarServidor(index+ 1);
              }else{
    
                if (tipoFile ==1) {
                  this.files[index].message = res.data;
                  this.files[index].status = 'error';
                } else {
                  this.filesVideos[index].message = res.data;
                  this.filesVideos[index].status = 'error';
                }
                enviarServidor(index+ 1);
              }
              },
            (err) => enviarServidor(index+ 1),
          );

        }  

    }


    if (this.flag_edicion ==false) { /// nuevo ---

      let tipoArchivo = (tipoFile==1) ? "1" : "2";
      this.publicarService.verificarMultimedia(this.idAnuncioGlobal,  tipoArchivo )
      .subscribe(
        (res:any) => {
          if (res =="OK") {               
            enviarServidor(0);
          }                                        
        },
        error => {
          alert('Error Horario :' + JSON.stringify(error));
        },
      )

    }else{
      enviarServidor(0);
    }
   


  }

 /// FIN DE MULTIMEDIA


  ///---- INICIO DE APARIENCIA ----

  saveApariencia(){
        
    let atencionMujer = (this.formParamsCaracteristica.value.atencion_Mujer) ? 'SI' : '';
    let atencionParejas = (this.formParamsCaracteristica.value.atencion_Parejas) ?  'SI' : '';
    let atencionDiscapa = (this.formParamsCaracteristica.value.atencion_Discapacitados) ?  'SI' : '';
    let atencionMan = (this.formParamsCaracteristica.value.atencion_Hombres) ?  'SI' : '';
    let efectivo = (this.formParamsCaracteristica.value.medioPago_Efectivo) ?  'SI' : '';
    let tarjeta = (this.formParamsCaracteristica.value.medioPago_Tarjeta) ?  'SI' : '';
    
    //----formateando-----
    this.formParamsCaracteristica.patchValue({"atencion_Mujer": atencionMujer , "atencion_Parejas" : atencionParejas, "atencion_Discapacitados" :  atencionDiscapa, "atencion_Hombres": atencionMan , "medioPago_Efectivo" : efectivo, "medioPago_Tarjeta" :  tarjeta,});
   
    this.publicarService.saveCaracteristicas(this.formParamsCaracteristica.value)
        .subscribe(
          (res:any) => {
            console.log(res)
            if (res.ok==true) {               
                
            }else{
              alert('Error Apariencia :' + JSON.stringify(res.data));
            }                                         
          },
          error => {
            alert('Error Apariencia :' + JSON.stringify(error))
          },
        )   
  }

  ///---- FIN DE APARIENCIA -----


  onCheckChange(event) {
    // const formArray: FormArray = this.formParamsServicios.get('listServicio') as FormArray;  
    // /* Selected */
    // if(event.target.checked){
    //   // Add a new control in the arrayForm
    //   formArray.push(new FormControl(event.target.value));
    // }else{
    //   // find the unselected element
    //   let i: number = 0;
  
    //   formArray.controls.forEach((ctrl: FormControl) => {
    //     if(ctrl.value == event.target.value) {
    //       // Remove the unselected element from the arrayForm
    //       formArray.removeAt(i);
    //       return;
    //     }  
    //     i++;
    //   });
    // }
  }

  saveServicios(){
    var serviciosBD = [];
    for (let obj of this.servicios) {
      if (obj.grupo_caracteristica == 8 || obj.grupo_caracteristica == 9 ) {
        if (obj.checkeado ==true) {
          serviciosBD.push({
            id_AnuncioServicio: 0,
            id_Anuncio: this.idAnuncioGlobal,
            idGrupoServicio: obj.grupo_caracteristica,
            id_servicio: obj.id_caracteristica,
            estado: 1,
            usuario_creacion: this.idUserGlobal
          })
        }
      }
    }  
      if ( serviciosBD.length> 0) {    
        Swal.fire({
          title: 'Sistemas',
          text: 'Por favor espere ...',
          icon: 'info',
        })
        Swal.showLoading();
          this.publicarService.saveServicios(serviciosBD)
            .subscribe((res:any) => {
                console.log(res)
                Swal.close();
                if (res.ok==true) {               
                    
                }else{
                  alert(' Error Servicios :' + JSON.stringify(res.data));
                }                                         
              }, error => {
                Swal.close();
                alert(' Error Servicios :' + JSON.stringify(error))
              },
            )     
      }  
  }
    
  saveLugarEncuentro(){
    var lugarEncuentros=[];
    for (let obj of this.servicios) {
      if (obj.grupo_caracteristica ==10) {
        if (obj.checkeado ==true) {
          lugarEncuentros.push({
            id_AnuncioLugar : 0, 
            id_Anuncio : this.idAnuncioGlobal, 
            id_lugar : obj.id_caracteristica, 
            otro_AnuncioLugar: '', 
            estado : 1, 
            usuario_creacion : this.idUserGlobal
          })
        }
      }
    }

    if (lugarEncuentros.length>0) {
      this.spinner.show();
      this.publicarService.saveLugarEncuentro(lugarEncuentros)
          .subscribe((res:any)=>{
            console.log(res)
            this.spinner.hide();
            if (res.ok==true) {               
                
            }else{
              alert(JSON.stringify(res.data));
            } 
          }, (error)=>{
            this.spinner.hide();
            alert(JSON.stringify(error));
          })
    }
  }
  
  ///ESTABLECIENDO MI UBICACION GOOGLE MAPS

  saveUbicacion(){
   this.spinner.show();
    this.publicarService.saveCoordenadas( this.idAnuncioGlobal, this.latitude, this.longitude )
        .subscribe((res:any)=>{
          console.log(res)
          this.spinner.hide();
          if (res.ok==true) {               
              
          }else{
            alert('Error Mapa :' +JSON.stringify(res.data));
          } 
        }, (error)=>{
          this.spinner.hide();
          alert('Error Mapa :' +JSON.stringify(error));
        })

  }
  ///FIN ESTABLECIENDO MI UBICACION GOOGLE MAPS

  //------PARTE FINAL ALMACENAMIENTO GENERAL

   publicarAnuncioGeneral(){
     ///- datos del anuncio ----
      if (this.formParams.value.id_Categoria == '' || this.formParams.value.id_Categoria == 0) {
        this.alertasService.Swal_alert('error','DATOS ANUNCIO: seleccione la categoria');
        return 
      }
      if (this.formParams.value.telefono_Anuncion == '' || this.formParams.value.telefono_Anuncion == 0) {
        this.alertasService.Swal_alert('error','DATOS ANUNCIO: ingrese el telefono del Anuncio');
        return 
      }
      if (this.formParams.value.id_Departemento == '' || this.formParams.value.id_Departemento == 0) {
        this.alertasService.Swal_alert('error','DATOS ANUNCIO: Seleccione el Departamento');
        return 
      }
      if (this.formParams.value.id_Distrito == '' || this.formParams.value.id_Distrito == 0) {
        this.alertasService.Swal_alert('error','DATOS ANUNCIO: Seleccione el Distrito');
        return 
      }   
      if (this.formParams.value.titulo_anuncio == '' || this.formParams.value.titulo_anuncio == null) {
        this.alertasService.Swal_alert('error','DATOS ANUNCIO: Ingrese un Titulo');
        return 
      }
      if (this.formParams.value.descripcion_anuncio == '' || this.formParams.value.descripcion_anuncio == null) {
        this.alertasService.Swal_alert('error','DATOS ANUNCIO: Ingrese la Descripcion del anuncio');
        return 
      }  
  
      if (this.formParams.value.nombre_anuncio == '' || this.formParams.value.nombre_anuncio == null) {
        this.alertasService.Swal_alert('error','DATOS ANUNCIO: Ingrese el Nombre del anuncio');
        return 
      }
  
      if (this.formParams.value.edad_anuncio == '' || this.formParams.value.edad_anuncio == null) {
        this.alertasService.Swal_alert('error','DATOS ANUNCIO: Seleccione la edad');
        return 
      }
  
      if (this.formParams.value.contactoWhatsapp) {
        this.formParams.patchValue({contactoWhatsapp: 1});
      }else{
        this.formParams.patchValue({contactoWhatsapp: 0});
      }
     ///- fin de datos del anuncio ----


     ///- validacion de horario individual

     if (this.flagAllDias) { /// opcion individual
      if (this.formParamsHorario.value.horaInicial == null || this.formParamsHorario.value.horaInicial == '' || this.formParamsHorario.value.horaInicial == 0) {
        this.alertasService.Swal_alert('error','HORARIO: Seleccione o ingrese la Hora Inicial');
        return 
      }
      if (this.formParamsHorario.value.horaFinal == null || this.formParamsHorario.value.horaFinal == '' || this.formParamsHorario.value.horaFinal == 0) {
        this.alertasService.Swal_alert('error','HORARIO: Seleccione o ingrese la Hora Final');
        return 
      }
     }
  ///- Fin de  validacion de horario individual

  /// validacion apariencia 

    if (this.formParamsCaracteristica.value.id_Nacionalidad == null || this.formParamsCaracteristica.value.id_Nacionalidad == '' || this.formParamsCaracteristica.value.id_Nacionalidad == 0) {
      this.alertasService.Swal_alert('error','APARIENCIA: Seleccione una nacionalidad');
      return 
    }
  
    if (this.formParamsCaracteristica.value.id_Piel == null || this.formParamsCaracteristica.value.id_Piel == '' || this.formParamsCaracteristica.value.id_Piel == 0) {
      this.alertasService.Swal_alert('error','APARIENCIA: Seleccione un color de Piel');
      return 
    }

    if (this.formParamsCaracteristica.value.id_Cabello == null || this.formParamsCaracteristica.value.id_Cabello == '' || this.formParamsCaracteristica.value.id_Cabello == 0) {
      this.alertasService.Swal_alert('error','APARIENCIA: Seleccione un color de cabello');
      return 
    }


  /// Fin de validacion apariencia 

    this.saveAnuncios();
   }

  ////--- FIN DE ALMACENAMIENTO GENERAL

  abrilModal_tipoAnuncio(){
    $('#modalTipoAnuncio').modal('show');
  }

  seleccionTipoAnuncio(valor:number){
    alert('elegido' + valor);
  }


  change_seleccionPortada(valor,indice){

    let valorElegido = valor ? 1 :0;
    for (let index = 0; index < this.files.length; index++) {
      if (index !=indice) { 
          this.files[index].portada = 0 
      } else{
        this.files[index].portada = valorElegido;
      }              
    } 

  }
}
