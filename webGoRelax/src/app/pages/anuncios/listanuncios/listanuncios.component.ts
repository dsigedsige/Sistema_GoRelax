import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listanuncios',
  templateUrl: './listanuncios.component.html',
  styleUrls: ['./listanuncios.component.css']
})
export class ListanunciosComponent implements OnInit {

  @Input() listAnuncios :any [];
  constructor() { 
 
   }

  ngOnInit() {

  }
  
}
