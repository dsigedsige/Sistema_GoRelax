import { Component, OnInit } from '@angular/core';
import { AnunciosService } from '../../services/anuncios/anuncios.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imagenes:any[] = [];
  categorias:any[] = [];
  constructor( private anunciosService: AnunciosService, private spinner: NgxSpinnerService) {
     this.get_CategoriasAnuncios();
   }

  ngOnInit() {

  }

  get_CategoriasAnuncios(){
   this.spinner.show();
   this.anunciosService.getCategorias()
       .subscribe(
         (res:any) => {
            this.spinner.hide();
            if (res.ok==true) {        
                this.categorias = res.data;    
            }else{
              alert(res.data);
            }                                         
          },
          error => {
            this.spinner.hide();
            alert(error)
          },
       );
      
  }

}
