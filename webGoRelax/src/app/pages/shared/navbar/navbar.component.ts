import { Component, OnInit } from '@angular/core';
import { BienvenidaService } from '../../../services/bienvenida/bienvenida.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertasService } from '../../../services/alertas/alertas.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit { 
  
  formParams : FormGroup;
  showMenu=false;
  nameUser="";

  constructor(private bienvenidaService :BienvenidaService, private router:Router, private loginService:LoginService, 
              private alertasService :AlertasService, private spinner: NgxSpinnerService) {   
    // this.loginService.isLoggedIn$.subscribe(status => {
    //    this.showMenu = status;
    // });
    // this.loginService.nameUserLogin$.subscribe(user => {
    //   this.nameUser = user;
    // }); 

    this.loginService.isLogginUser$.subscribe(obj => {
      this.showMenu = obj.status;
      this.nameUser = obj.name;
    }); 

    this.inicializarFormularioAnuncio();
  }

  
  inicializarFormularioAnuncio(){ 
    this.formParams = new FormGroup({
      usuario : new FormControl(''), 
      contrasenia : new FormControl('')
     })
  }

  ngOnInit() {
      this.loginService.leerSesion();
  }


  publicar(){
    if (this.showMenu==true) {
      this.router.navigateByUrl('/publicar/0');
    }else{
      this.abrilModal_sesion();
    }
  }

  registrarse(){
    this.router.navigateByUrl('/registro');
  }
  
  cerrarSesion(){
    this.loginService.logOut();
    this.showMenu=false;
    this.loginService.updateLoginNameStatus(false,'');
    this.router.navigateByUrl('/home');
  }

  abrilModal_sesion(){;
    this.inicializarFormularioAnuncio();
    $('#modalSesion').modal('show');
  }

  SinCuenta(){
    $('#modalSesion').modal('hide');
    this.router.navigateByUrl('/registro');
  }

  iniciarSesion(){
    if (this.formParams.value.usuario == '' || this.formParams.value.usuario == 0) {
      this.alertasService.Swal_alert('error','Ingrese el usuario');
      return 
    }
    if (this.formParams.value.contrasenia == '' || this.formParams.value.contrasenia == null) {
      this.alertasService.Swal_alert('error','Ingrese la contraseña');
      return 
    }
    this.spinner.show();
    this.loginService.get_iniciarSesion(this.formParams.value.usuario, this.formParams.value.contrasenia)
        .subscribe((res:any)=>{
          this.spinner.hide();
          if (res.ok==true) {               
            $('#modalSesion').modal('hide');
          }else{
            alert(JSON.stringify(res.data));
          } 
        }, (error)=>{
          this.spinner.hide();
          alert(JSON.stringify(error));
        })
  }

}
