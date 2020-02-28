import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  @Input() listOfertas:any = [];
  constructor() { }

  ngOnInit() {
  }

}
