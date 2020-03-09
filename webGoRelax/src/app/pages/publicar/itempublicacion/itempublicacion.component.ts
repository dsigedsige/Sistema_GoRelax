import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { PublicarService } from '../../../services/publicar/publicar.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertasService } from '../../../services/alertas/alertas.service';
import { LoginService } from '../../../services/login/login.service';
import { Router } from '@angular/router';
import { InputFileI } from 'src/app/model/inputfile.interface';
 
 

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
  formParamsServicios : FormGroup;

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
  mytime: Date = new Date();

  opcionHorario:any = [];
  tarifas:any[] = [];
  horarios:any[] = [];
  flagAllDias=true;
  dia="";
 
  files:InputFileI[] = [];
  filesVideos:InputFileI[] = []
  
  constructor(private  publicarService:PublicarService,  private spinner: NgxSpinnerService, private alertasService:AlertasService, 
              private loginService: LoginService,private router:Router,private chRef: ChangeDetectorRef, private fb: FormBuilder ) {   
                
    //---obteniendo el id del usuario, verificando si esta logeasdo ----
    this.idUserGlobal = this.loginService.getSession();
    if ( !this.idUserGlobal) {   
      this.router.navigateByUrl('/home');
      return;
    }
    //-------- asignar un valor a un objeto
     //this.formParams.patchValue({titulo_anuncio: 'Rafaelito el cacherito'});

    this.inicializarFormularioAnuncio();
    this.inicializarFormularioTarifa();
    this.inicializarFormularioHorarios();
    this.inicializarFormularioMultimedia();
    this.inicializarFormularioCaracteristica();
    this.inicializarFormularioServicios();

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

  ngOnInit() {

  }

  inicializarFormularioAnuncio(){
    this.formParams = new FormGroup({
      id_Anuncio : new FormControl('0'), 
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
      id_Anuncio: new FormControl('316'), 
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
      id_Anuncio: new FormControl('316'), 
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
      id_Anuncio: new FormControl('316'), 
      nombre_GaleriaAnuncio: new FormControl(''), 
      tipoArchivo_GaleriaAnuncio: new FormControl(''), 
      estado: new FormControl('1'), 
      usuario_creacion: new FormControl(this.idUserGlobal) 
     })
  }

  inicializarFormularioCaracteristica(){
    this.formParamsCaracteristica = new FormGroup({
      id_CaracteristicaAnuncio: new FormControl('0'), 
      id_Anuncio: new FormControl('316'), 
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


  inicializarFormularioServicios(){
    this.formParamsServicios  = this.fb.group({
      id_AnuncioServicio: ['0'],
      id_Anuncio: ['316'],
      idGrupoServicio: [''],
      id_servicio: [''],
      listServicio: new FormArray([]),
      estado: ['1'],
      usuario_creacion: [this.idUserGlobal],
 
    });

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
      if (this.formParams.value.id_Categoria == '' || this.formParams.value.id_Categoria == 0) {
        this.alertasService.Swal_alert('error','seleccione la categoria');
        return 
      }
      if (this.formParams.value.telefono_Anuncion == '' || this.formParams.value.telefono_Anuncion == 0) {
        this.alertasService.Swal_alert('error','ingrese el telefono del Anuncio');
        return 
      }
      if (this.formParams.value.id_Departemento == '' || this.formParams.value.id_Departemento == 0) {
        this.alertasService.Swal_alert('error','Seleccione el Departamento');
        return 
      }
      if (this.formParams.value.id_Distrito == '' || this.formParams.value.id_Distrito == 0) {
        this.alertasService.Swal_alert('error','Seleccione el Distrito');
        return 
      }   
      if (this.formParams.value.titulo_anuncio == '' || this.formParams.value.titulo_anuncio == null) {
        this.alertasService.Swal_alert('error','Ingrese un Titulo');
        return 
      }
      if (this.formParams.value.descripcion_anuncio == '' || this.formParams.value.descripcion_anuncio == null) {
        this.alertasService.Swal_alert('error','Ingrese la Descripcion del anuncio');
        return 
      }  
  
      if (this.formParams.value.nombre_anuncio == '' || this.formParams.value.nombre_anuncio == null) {
        this.alertasService.Swal_alert('error','Ingrese el Nombre del anuncio');
        return 
      }
  
      if (this.formParams.value.edad_anuncio == '' || this.formParams.value.edad_anuncio == null) {
        this.alertasService.Swal_alert('error','Seleccione la edad');
        return 
      }

      if (this.formParams.value.contactoWhatsapp) {
        this.formParams.patchValue({contactoWhatsapp: 1});
      }else{
        this.formParams.patchValue({contactoWhatsapp: 0});
      }
    
      this.spinner.show();    
      this.publicarService.saveAnuncios(this.formParams.value)
      .subscribe(
        (res:any) => {  
          console.log('res', res)  
          this.spinner.hide();                                       
        },
        error => {
          this.spinner.hide();
          alert(error)          
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
    this.inicializarFormularioTarifa();
  }
  
  eliminarTarifa(tarifa){
    var pos = this.tarifas.indexOf(tarifa);  // (pos) es la posición para abreviar
    this.tarifas.splice( pos, 1 );
  }

  saveTarifa(){
    if (this.tarifas.length> 0) {   
      this.spinner.show();   
      this.publicarService.saveTarifas(this.tarifas)
          .subscribe(
            (res:any) => {
              console.log(res);
              this.spinner.hide();
              if (res.ok==true) {               
                  
              }else{

              }                                         
            },
            error => {
              this.spinner.hide();
              alert(error)
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

    if (this.formParamsHorario.value.horaInicial == null || this.formParamsHorario.value.horaInicial == '' || this.formParamsHorario.value.horaInicial == 0) {
      this.alertasService.Swal_alert('error','Seleccione o ingrese la Hora Inicial');
      return 
    }
    if (this.formParamsHorario.value.horaFinal == null || this.formParamsHorario.value.horaFinal == '' || this.formParamsHorario.value.horaFinal == 0) {
      this.alertasService.Swal_alert('error','Seleccione o ingrese la Hora Final');
      return 
    }

    let HoraIniFormateado =   this.formatAMPM( this.formParamsHorario.value.horaInicial);
    let HoraFinFormateado =   this.formatAMPM( this.formParamsHorario.value.horaFinal);
  
    this.formParamsHorario.patchValue({"descripcion":  'Lunes a Domingo', "horaInicial" : HoraIniFormateado, "horaFinal" :  HoraFinFormateado});

    this.horarios= [];
    this.horarios.push(this.formParamsHorario.value);

    this.spinner.show();   
    this.publicarService.saveHorarios(this.horarios)
        .subscribe(
          (res:any) => {
            this.spinner.hide();
            if (res.ok==true) {               
                
            }else{

            }                                         
          },
          error => {
            this.spinner.hide();
            alert(error)
          },
        )


  }else{ //// opcion multiple de horas   

    if (this.horarios.length> 0) {   
      this.spinner.show();   
      this.publicarService.saveHorarios(this.horarios)
          .subscribe(
            (res:any) => {
              console.log(res);
              this.spinner.hide();
              if (res.ok==true) {               
                  
              }else{
  
              }                                         
            },
            error => {
              this.spinner.hide();
              alert(error)
            },
          )
    }

     
  }

  

 



}
       
 // FIN DE HORARIO DE TARIFAS

 ///--- MULTIMEDIA--

 onFileChange(event:any, opcion:number) {
   
  var files = event.target.files; //FileList object
  
   if (opcion==1) {  //----fotos

    var fileFoto:InputFileI [] = []; 
    for (var i = 0; i < files.length; i++) { //for multiple files          
      (function(file) {
          var name = file;
          var reader = new FileReader();  
          reader.onload = function(e) {                 
               let urlImage =e.target ;
               fileFoto.push({
                    'file': name,
                    'urlfile' : urlImage['result'],
                    'status': '',
                    'message': ''
                })  
          }
          reader.readAsDataURL(file);
      })(files[i]);
    }
    this.files = fileFoto;
    console.log(this.files);  

   }else{ ///----videos    
    
    var fileVideo:InputFileI [] = []; 
    for (var i = 0; i < files.length; i++) { //for multiple files          
        fileVideo.push({
          'file': files[i],
          'urlfile' : "",
          'status': '',
          'message': ''
      })  
    }
    this.filesVideos = fileVideo;
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

      if (tipoFile ==1) {
        this.formParamsMultimedia.patchValue({"nombre_GaleriaAnuncio": this.files[index].file.name, "tipoArchivo_GaleriaAnuncio" : 1}); 
      }else{
        this.formParamsMultimedia.patchValue({"nombre_GaleriaAnuncio": this.filesVideos[index].file.name, "tipoArchivo_GaleriaAnuncio" : 2}); 
      }     

      this.publicarService.upload( (tipoFile==1) ? this.files[index].file   : this.filesVideos[index].file   , this.formParamsMultimedia.value).subscribe(
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
  enviarServidor(0);

  }


 /// FIN DE MULTIMEDIA


  ///---- INICIO DE APARIENCIA ----

  saveApariencia(){

    if (this.formParamsCaracteristica.value.id_Nacionalidad == null || this.formParamsCaracteristica.value.id_Nacionalidad == '' || this.formParamsCaracteristica.value.id_Nacionalidad == 0) {
      this.alertasService.Swal_alert('error','Seleccione una nacionalidad');
      return 
    }

    if (this.formParamsCaracteristica.value.id_Piel == null || this.formParamsCaracteristica.value.id_Piel == '' || this.formParamsCaracteristica.value.id_Piel == 0) {
      this.alertasService.Swal_alert('error','Seleccione un color de Piel');
      return 
    }
   
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
            this.spinner.hide();
            if (res.ok==true) {               
                
            }else{
    
            }                                         
          },
          error => {
            this.spinner.hide();
            alert(JSON.stringify(error))
          },
        )   

  }

  onCheckChange(event) {
    const formArray: FormArray = this.formParamsServicios.get('listServicio') as FormArray;  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }  
        i++;
      });
    }
  }

  saveServicios(){
 

  var serviciosBD = [];
   const formArray: FormArray = this.formParamsServicios.get('listServicio') as FormArray;  
   formArray.controls.forEach((ctrl: FormControl) => {
        serviciosBD.push({
          id_AnuncioServicio: this.formParamsServicios.value.id_AnuncioServicio,
          id_Anuncio: this.formParamsServicios.value.id_Anuncio,
          idGrupoServicio: this.formParamsServicios.value.idGrupoServicio,
          id_servicio: ctrl.value,
          estado:this.formParamsServicios.value.estado,
          usuario_creacion: this.formParamsServicios.value.usuario_creacion,
        });
    }); 

    if (  serviciosBD.length> 0) {    
      this.spinner.show();  
        this.publicarService.saveServicios(serviciosBD)
          .subscribe((res:any) => {
              console.log(res)
              this.spinner.hide();
              if (res.ok==true) {               
                  
              }else{
      
              }                                         
            }, error => {
              this.spinner.hide();
              alert(JSON.stringify(error))
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
            id_Anuncio : 316, 
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
    
            } 
          }, (error)=>{
            
          })
    }
  }


  // saveUbicacion(){

  // }

  ///---- FIN DE APARIENCIA -----





}
