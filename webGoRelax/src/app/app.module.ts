import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// para poder utilizar en ng-model
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// importar rutas
///---- RUTAS
import { APP_ROUTING } from './app.routes';

////------ peticiones http
import { HttpClientModule } from '@angular/common/http' ;

//----bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//----carousel
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

//LightboxModule
import { LightboxModule } from 'ngx-lightbox';

// loading
import { NgxSpinnerModule } from "ngx-spinner";

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/// google maps
import { AgmCoreModule } from '@agm/core'; 

///
 import { TimepickerModule } from 'ngx-bootstrap/timepicker';
 import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { DomseguroPipe } from './pipes/domseguro.pipe'

/// angular File
import { ngfModule, ngf } from "angular-file"

import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { HomeComponent } from './pages/home/home.component';
import { AnunciosComponent } from './pages/anuncios/anuncios.component';
import { ListanunciosComponent } from './pages/anuncios/listanuncios/listanuncios.component';
import { OfertasComponent } from './pages/anuncios/ofertas/ofertas.component';
import { MensajesComponent } from './pages/anuncios/mensajes/mensajes.component';
import { ItemanunciosComponent } from './pages/anuncios/itemanuncios/itemanuncios.component';
import { CarouselComponent } from './pages/anuncios/carousel/carousel.component';
import { SpinnerloadingComponent } from './pages/shared/spinnerloading/spinnerloading.component';
import { FiltergroupPipe } from './pipes/filtergroup.pipe';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListpublicacionComponent } from './pages/publicar/listpublicacion/listpublicacion.component';
import { ItempublicacionComponent } from './pages/publicar/itempublicacion/itempublicacion.component';
import { FiltercaracteristPipe } from './pipes/filtercaracterist.pipe';


 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BienvenidaComponent,
    HomeComponent,
    AnunciosComponent,
    ListanunciosComponent,
    OfertasComponent,
    MensajesComponent,
    ItemanunciosComponent,
    CarouselComponent,
    SpinnerloadingComponent,
    DomseguroPipe,
    FiltergroupPipe,
    RegistroComponent,
    ListpublicacionComponent,
    ItempublicacionComponent,
    FiltercaracteristPipe,
 
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    NgbModule,
    CarouselModule,
    BrowserAnimationsModule,
    LightboxModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCODMQ6da1HjWKn_nMqSl9oD8RooAyCKzA',
      libraries: ['places']
    }),
    FormsModule,
    ReactiveFormsModule ,
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ngfModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 