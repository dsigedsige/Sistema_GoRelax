import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  @Input() listMensajes:any [] =[];
  constructor() { }

  ngOnInit() {
  }

}
