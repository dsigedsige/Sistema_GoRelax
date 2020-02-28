import { Component, OnInit } from '@angular/core';
import { BienvenidaService } from '../../../services/bienvenida/bienvenida.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  mayorEdad='';
  showMenu=false;

  constructor(private bienvenidaService :BienvenidaService, private router:Router) { }

  ngOnInit() {
    //console.log(this.bienvenidaService.leerBienvenida())
  }

  registrarse(){
    this.router.navigateByUrl('/registro');
  }

}
