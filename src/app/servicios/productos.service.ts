import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductos } from '../modelos/modeloProducto';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  private url = 'https://crudform-adeca.firebaseio.com/productos.json';  
  private urlUpdate = 'https://crudform-adeca.firebaseio.com/productos';  

  constructor( private httpClient: HttpClient ) { 

     console.log("SERVICIOS SERVICE ---- Invoca el servicio PRODUCTOS...... Ver:0354")


  }


  cargar() {
   
    return this.httpClient.get<IProductos>( this.url )
          .pipe(
            map(  this.crearArreglo )
          );
  
  }

  // Put Crear Compras
  actualizar( producto:IProductos ) {
   

    console.log("---- > ACTUALIZAR PRODUCTOS ");
    console.log(producto)
    return this.httpClient.put( `${this.urlUpdate}/${producto.Id}.json`, producto );

  }






  crearArreglo( productosObj: object   )  {

   const productos: IProductos[] = [];

   if ( productosObj === null ) return [];
  

   Object.keys(productosObj).forEach( key => {
      
    const producto: IProductos = productosObj[key];

    productos.push( producto );

   });
   return productos;

  }

}
