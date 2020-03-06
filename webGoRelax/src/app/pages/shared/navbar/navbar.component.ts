import { Component, OnInit } from '@angular/core';
import { BienvenidaService } from '../../../services/bienvenida/bienvenida.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit { 
  
  showMenu=false;

  constructor(private bienvenidaService :BienvenidaService, private router:Router, private loginService:LoginService) {   
    this.loginService.isLoggedIn$.subscribe(status => {
        this.showMenu = status;
      });
  }

  ngOnInit() {
      this.loginService.leerSesion();
  }

  registrarse(){
    this.router.navigateByUrl('/registro');
  }
  
  cerrarSesion(){
    this.loginService.logOut();
    this.showMenu=false;
    this.loginService.updateLoginStatus(false);
    this.router.navigateByUrl('/home');
  }

}
