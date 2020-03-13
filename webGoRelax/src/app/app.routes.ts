import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { HomeComponent } from './pages/home/home.component';
import {  AnunciosComponent } from './pages/anuncios/anuncios.component';
import { ItemanunciosComponent } from './pages/anuncios/itemanuncios/itemanuncios.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ItempublicacionComponent } from './pages/publicar/itempublicacion/itempublicacion.component';
import { ListpublicacionComponent } from './pages/publicar/listpublicacion/listpublicacion.component';

 
const APP_ROUTERS: Routes = [
    //{ path: 'home', component: HomeComponent  ,  canActivate: [AuthGuard]},  
    { path: 'inicio', component: BienvenidaComponent},  
    { path: 'home', component: HomeComponent},  
    { path: 'anuncios/:id', component: AnunciosComponent},  
    { path: 'anunciosDetalle/:id_anuncio', component: ItemanunciosComponent},  
    { path: 'registro', component: RegistroComponent},  
    { path: 'publicar/:id_anuncio', component: ItempublicacionComponent},  
    { path: 'publicaciones', component: ListpublicacionComponent},  
    { path: '', pathMatch:'full', redirectTo:'inicio' },
    { path: '**', pathMatch:'full', redirectTo:'inicio' },
  ];
  
  export const APP_ROUTING = RouterModule.forRoot(APP_ROUTERS,{useHash:true});  


 