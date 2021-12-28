import { Component, OnInit } from '@angular/core';
import { Compras, ListaProducto } from 'src/app/modelos/modeloCompra';
import { IProductos } from 'src/app/modelos/modeloProducto';
import { ComprasService } from 'src/app/servicios/compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  producto: IProductos = null;
  compra: Compras = { IdCompra: null, fecha: "", listProd: [] };
  productos: IProductos[] = []; 
  total = 0;
  cantidad = 0;

  constructor(private comprasService: ComprasService) { }

  ngOnInit(): void {
    


    let compraSt = localStorage.getItem("CCE_COMPRA"); 
    this.compra = JSON.parse(compraSt);
    

    let productoSt = localStorage.getItem("CCE_PRODUCTOS"); 
    this.productos = JSON.parse(productoSt);


    this.calcularTotales();


}


eliminarProducto( productoItem:ListaProducto, idx:number ) {

  // CALCULAR Y ACTUALIZAR STORAGE
  this.comprasService.eliminarProducto( this.compra, this.productos, productoItem, idx);

  let compraSt = JSON.stringify(this.compra);
  localStorage.setItem("CCE_COMPRA",compraSt);

  let productoSt = JSON.stringify(this.productos);
  localStorage.setItem("CCE_PRODUCTOS",productoSt);

  this.calcularTotales();

  // this.router.navigate( ['/producto',] );




}


calcularTotales() {

  this.compra.listProd.forEach(item => {
    this.cantidad = this.cantidad + item.cantidad;
    this.total = this.total + ( item.cantidad * item.valor )

  });

  if (  this.compra.listProd.length < 1 ) {
    this.cantidad = 0;
    this.total = 0;

  }


}


}
