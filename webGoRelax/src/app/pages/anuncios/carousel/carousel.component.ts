import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() listCarousel:any[] = [] ;

  imagenes:any[] = [];
  isDragging: boolean;
  constructor() {
   }

  ngOnInit() {
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

}
