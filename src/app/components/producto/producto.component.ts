import { Component, OnInit } from '@angular/core';
import { IProductos } from 'src/app/modelos/modeloProducto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: IProductos = null;

  constructor() { }

  ngOnInit(): void {

    let prod = localStorage.getItem("CCE_PRODUCTO"); 

    console.log("Opcion de detalle de heroe o Producto version 2 ");
    console.log(prod);    

    this.producto = JSON.parse(prod);
    console.log(this.producto);    

  }

}

