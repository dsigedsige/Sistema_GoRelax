import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { RegistroService } from '../../services/registro/registro.service';
import { LoginService } from '../../services/login/login.service';
import { AlertasService } from '../../services/alertas/alertas.service';




declare var $:any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegistro : FormGroup;
  formRegistro2 : FormGroup;
  flagRegistro=false;
  IdusuarioGlobal:number=0;
  codVerificacion:string="";

  usuario:any = {
    email: 'rafa.languasco@gmail.com'
  }

  constructor(private fb:FormBuilder, private registroService:RegistroService,  private spinner: NgxSpinnerService, 
              private AlertasService:AlertasService, private router:Router, loginService:LoginService) {
    this.crearFormulario();
    this.crearFormulario2();
   }

  ngOnInit() {
    
  }

  crearFormulario(){
    this.formRegistro = this.fb.group({
      email : ['', [ Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }


  crearFormulario2(){
    this.formRegistro2 = this.fb.group({
      nombre : ['', [ Validators.required]],
      contra : ['', [ Validators.required]],
      repetir : ['', [ Validators.required]],
      mayor : ['', [ Validators.required]],
      politicas : ['', [ Validators.required]]
    });
  }

  
  enviarCorreo(){
    if ((this.formRegistro.value.email).trim() == '') {
       this.AlertasService.Swal_alert('error','Ingrese un correo');
      return
    }

    this.spinner.show();
    this.registroService.enviandoCorreo((this.formRegistro.value.email).trim() )
    .subscribe(
      (res:any) => {
         this.spinner.hide();
        if (res.ok == true) { 
            if (res.data[0].cantidad ==0) {               
               this.IdusuarioGlobal = res.data[0].id_usuario;  
              this.codVerificacion = res.data[0].dato;    
              this.AlertasService.Swal_alert('success','Codigo Confirmacion enviado al correo ingresado'); 
              this.abrilModal_verificacion();

            }else{  
              this.AlertasService.Swal_alert('warning','Codigo de confirmacion ya enviada.'); 
            }
        }else{
          alert(JSON.stringify(res.data));
        }                                         
      },
      error => {
         this.spinner.hide();
         alert(JSON.stringify(error));
      },
    )

 }

  abrilModal_verificacion(){
    this.flagRegistro=false;
    $('#modalverificar').modal('show');
  }

  verPolitica(){
    $('#modalPoliticas').modal('show');
  }

  VerificarRegistro(){
    if (this.codVerificacion =='' ||     this.codVerificacion ==null) {
      this.AlertasService.Swal_alert('error','Ingrese el codigo de verificacion');      
      return      
    }else{
      this.spinner.show();
      this.registroService.get_verificarCodigo(this.codVerificacion)
          .subscribe((res:any)=>{
               this.spinner.hide();        
               if (res ==0 || res =='0') {
                this.flagRegistro=false;
               }else{
                this.flagRegistro=true;
                this.crearFormulario2();
               }         
            },
            error => {
              this.spinner.hide();
              alert(error)
           },
          );
    }
  }

  ingresarRegistro(){
 
    if (this.formRegistro2.value.nombre =='' || this.formRegistro2.value.nombre == null) {
      this.AlertasService.Swal_alert('error','Ingrese nombre o seudonimo');
      return 
    }
    if (this.formRegistro2.value.contra =='' || this.formRegistro2.value.contra == null) {
      this.AlertasService.Swal_alert('error','Ingrese la contraseña que desea');
      return 
    }
    if (this.formRegistro2.value.repetir =='' || this.formRegistro2.value.repetir == null) {
      this.AlertasService.Swal_alert('error','Ingrese la contraseña repetir');
      return 
    }

    if (this.formRegistro2.value.contra !=  this.formRegistro2.value.repetir) {
      this.AlertasService.Swal_alert('error','El repetir contraseña debe de ser igual a la contraseña');
      return 
    }

    if (this.formRegistro2.value.mayor =='' || this.formRegistro2.value.mayor == null) {
      this.AlertasService.Swal_alert('error','Tiene que aceptar ser mayor edad');
      return 
    }
    if (this.formRegistro2.value.politicas =='' || this.formRegistro2.value.politicas == null) {
      this.AlertasService.Swal_alert('error','Tiene que aceptar las politicas');
      return 
    }

    this.spinner.show(); 
    this.registroService.get_actualizarRegistro( this.IdusuarioGlobal ,this.formRegistro2.value.nombre , this.formRegistro2.value.contra )
        .subscribe((res:any)=>{
          this.spinner.hide();           
          if (res.ok ==true || res.ok == 'true' ) {

            $('#modalverificar').modal('hide')
            this.router.navigateByUrl('/anuncios/1');

          }else{ 
 
          }         
       },
       error => {
         this.spinner.hide();
         alert(error)
      },
     );
  }

}
