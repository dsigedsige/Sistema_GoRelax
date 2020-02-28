import { Component, OnInit  } from '@angular/core';


import { Lightbox } from 'ngx-lightbox';
//---para trabajar con las rutas
import { ActivatedRoute, Router } from '@angular/router'
import { AnunciosService } from '../../../services/anuncios/anuncios.service';
import { NgxSpinnerService } from "ngx-spinner";
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-itemanuncios',
  templateUrl: './itemanuncios.component.html',
  styleUrls: ['./itemanuncios.component.css']
})
export class ItemanunciosComponent implements OnInit {

  anuncioDetalle:any [] = [];
  anuncioDetalleVideo:any [] = [];
  anuncioDetalleCaracteristica:any [] = [];

  idAnuncioGlobal:string='0';
  idCategoriaGlobal:string='0';
  idAnuncio_idCategoria:string='0';

  tabControl: string[] = ['Ubícame','Descripción'];
  tabControlDetalle: string[] = ['Fotos','Videos'];

  selectedTabControl :any;
  selectedTabControlDetalle :any;

  imagenes:any[] = [];
  Lightboximagenes:any[] = [];

  anunciosTop:any[] = [];
  isDragging: boolean;
  
  lat: number = -12.0965997;
  lng: number = -76.9695381;
  zoom: number = 13;

  constructor( private _lightbox: Lightbox, private activatedRoute:ActivatedRoute,
     private anunciosService: AnunciosService, private spinner: NgxSpinnerService,private router:Router  ) {

          //---obtener el parametro que viene por la url
    this.activatedRoute.params.subscribe(params=>{

      this.idAnuncio_idCategoria = params['id_anuncio'];
      var str = params['id_anuncio']
      var anuncios = str.split("-");
      
      this.idAnuncioGlobal = anuncios[0];
      this.idCategoriaGlobal= anuncios[1];
    })

    this.getAnuncioDetalle();

    setTimeout(() => {
      this.getAnunciosTop();
    }, 1000);

   }

  ngOnInit() {
    this.selectedTabControl = this.tabControl[0];
    this.selectedTabControlDetalle = this.tabControlDetalle[0];
  }   

  getAnuncioDetalle(){
    this.spinner.show();
    this.anunciosService.getObtenerAnuncioID(this.idAnuncioGlobal)
        .subscribe(
           (res:any) => {      
            this.spinner.hide();
             this.anuncioDetalle =[];
             this.anuncioDetalleVideo=[];
             this.anuncioDetalleCaracteristica= [];
             this.Lightboximagenes=[];           

            if (res.ok==true) {
              this.anuncioDetalle = res.data.list_anuncios;
              this.anuncioDetalleVideo = res.data.list_videos;
              this.anuncioDetalleCaracteristica = res.data.list_caracteristica;

              this.lat = parseFloat(this.anuncioDetalle[0].latitud_anuncio);
              this.lng = parseFloat(this.anuncioDetalle[0].longitud_anuncio);

              if (res.data.list_fotos.length > 0) {
                this.aplicarLightbox(res.data.list_fotos);
              }    
    
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

  aplicarLightbox(listFotos){
         //--- Lightboxi ---
         for (let obj of listFotos){
          const album = {
            src: obj.url_foto,
            caption: 'Go Relax',
            thumb: obj.url_foto
          };
          this.Lightboximagenes.push(album);
       }
  }

  /// ----lightbox
  open(index: number): void {
    this._lightbox.open(this.Lightboximagenes, index);
  } 
  close(): void {
    this._lightbox.close();
  }


  getAnunciosTop (){
    this.spinner.show();
    this.anunciosService.getObtenerAnuncios('1', -1, 10)
        .subscribe(
          (res:any) => {
            this.spinner.hide();
            if (res.ok==true) { 
                this.anunciosTop=res.data;                
            }else{
              alert(res.data);
            }                                         
          },
          error => {
            this.spinner.hide();
            alert(error)
          },
        )
  }

  customOptions: OwlOptions = {    
    loop: true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 6
      },
      940: {
        items: 10
      }
    },
    nav: true,
    items: 6,

  }

  getCambiandoRuta(idAnuncio){


    this.idAnuncio_idCategoria = idAnuncio;
    let anuncios = idAnuncio.split("-");

    this.router.navigateByUrl('/anunciosDetalle/' + idAnuncio);
    this.idAnuncioGlobal = anuncios[0];
    this.idCategoriaGlobal = anuncios[1];

    this.getAnuncioDetalle();

    setTimeout(() => { 
      window.scrollTo(0,0) 
    }, 300);

  }

   

 


}
