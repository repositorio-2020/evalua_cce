
import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe } from '../../servicios/heroes.service';
import { IProductos } from 'src/app/modelos/modeloProducto';
import { Compras } from 'src/app/modelos/modeloCompra';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/servicios/productos.service';
import { ComprasService } from '../../servicios/compras.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: IProductos[] = []; 
  heroes:Heroe[] = [];
  compras: Compras[] = [] ;
  compra: Compras = { IdCompra: null, fecha: "", listProd: [] };


  constructor( private router:Router,
    private comprasService: ComprasService, 
    private productosService: ProductosService) { }



  ngOnInit(): void {

      let compraSt = localStorage.getItem("CCE_COMPRA"); 

      if ( ! compraSt ) { 

            this.productosService.cargar().subscribe( resp => {
    
            this.productos = resp;
            this.productos.splice(0,1);
            // INICIO ---------------- COMPRAS -------------------- 
                     
            this.comprasService.cargar().subscribe( resp => {
                  this.compras = resp;
                  this.compra = this.compras[0];
                  this.compra.listProd.splice(0);
            });
     
          });
                   // FIN ---------------- COMPRAS -------------------- 
      }  
      else {

           let compraSt = localStorage.getItem("CCE_COMPRA"); 
           this.compra = JSON.parse(compraSt);

           let productoSt = localStorage.getItem("CCE_PRODUCTOS"); 
           this.productos = JSON.parse(productoSt);
        } 
              
  }



  // Ver el detalle del prooducto
  verProducto( idx:number ) {

    let prod = JSON.stringify(this.productos[idx]);
    localStorage.setItem("CCE_PRODUCTO",prod);
    this.router.navigate( ['/producto',idx] );

  }


  // Adiciona producto a la compra afectando las cantidades de inventario y de compra
  addCompra( idx:number ) {

    this.comprasService.adicionarCompra( this.compra, this.productos, idx );
       
    let compraSt = JSON.stringify(this.compra);
    localStorage.setItem("CCE_COMPRA",compraSt);

    let productoSt = JSON.stringify(this.productos);
    localStorage.setItem("CCE_PRODUCTOS",productoSt);
    
    this.router.navigate( ['/compras'] );

  }


   // Eliminar informacion de compras del storage
   initCompra(  ) {

    localStorage.clear();

    let compraSt = localStorage.getItem("CCE_COMPRA"); 

    if ( ! compraSt ) { 

          this.productosService.cargar().subscribe( resp => {
  
          this.productos = resp;
          this.productos.splice(0,1);
          // INICIO ---------------- COMPRAS -------------------- 
                   
          this.comprasService.cargar().subscribe( resp => {
                this.compras = resp;
                this.compra = this.compras[0];
                this.compra.listProd.splice(0);
          });
   
        });
                 // FIN ---------------- COMPRAS -------------------- 
    }  
    else {

         let compraSt = localStorage.getItem("CCE_COMPRA"); 
         this.compra = JSON.parse(compraSt);

         let productoSt = localStorage.getItem("CCE_PRODUCTOS"); 
         this.productos = JSON.parse(productoSt);
      } 

   
  }


 

}