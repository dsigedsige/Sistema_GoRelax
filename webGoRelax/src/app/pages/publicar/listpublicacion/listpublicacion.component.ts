import { Component, OnInit } from '@angular/core';
import { PublicarService } from '../../../services/publicar/publicar.service';
import { LoginService } from '../../../services/login/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-listpublicacion',
  templateUrl: './listpublicacion.component.html',
  styleUrls: ['./listpublicacion.component.css']
})
export class ListpublicacionComponent implements OnInit {

  idUserGlobal =0;
  publicaciones:any [] =[];
  private actualPage: number;
  private finishPage: number; 

  constructor(private publicarService :PublicarService, private loginService: LoginService, private router: Router, private spinner: NgxSpinnerService) { 
        //---obteniendo el id del usuario, verificando si esta logeasdo ----
        this.idUserGlobal = this.loginService.getSession();
        if ( !this.idUserGlobal) {   
          this.router.navigateByUrl('/home');
          return;
        }
        this.actualPage = 1;
  }

  ngOnInit() {
    this.listandoPublicaciones();
  }

  listandoPublicaciones(){
    this.spinner.show();
    this.publicarService.get_listadoPublicaciones( this.idUserGlobal, this.actualPage, 10)
        .subscribe(
          (res:any) => {
            console.log(res)
            this.spinner.hide();
            if (res.ok==true) { 
                for (let obj of res.data ){
                  this.publicaciones.push(obj);
                }
      
                let totalPage= (res.totalpage/ 10);
                this.finishPage =Math.ceil(totalPage) ;

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


  
  onScroll() { 
    if (this.actualPage < this.finishPage) { 
      this.actualPage += 1;
      this.listandoPublicaciones();        
    }
  }

  irItemPublicacion(publicacion:any){
    this.router.navigateByUrl('/publicar/' + publicacion.id_Anuncio);
  }





}
