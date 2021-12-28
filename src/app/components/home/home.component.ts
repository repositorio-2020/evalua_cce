import { Component, OnInit } from '@angular/core';
import { Compras } from 'src/app/modelos/modeloCompra';
import { IProductos } from 'src/app/modelos/modeloProducto';
import { ProductosService } from 'src/app/servicios/productos.service';
import { ComprasService } from '../../servicios/compras.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'

})
export class HomeComponent implements OnInit {

  productos: IProductos[] = []; 
  compras: Compras[] = [] ;
  
  compra: Compras = { IdCompra: null, fecha: "", listProd: [] };
  

  constructor( private comprasService: ComprasService, private productosService: ProductosService  ) { }

  ngOnInit(): void {



  }

}
