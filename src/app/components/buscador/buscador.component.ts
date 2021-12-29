import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: []
})
export class BuscadorComponent implements OnInit {

  heroes:any[] = [];

  constructor( private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {



  }

}
