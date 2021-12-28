import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compras, ListaProducto } from '../modelos/modeloCompra';
import { IProductos } from '../modelos/modeloProducto';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private url = 'https://crudform-adeca.firebaseio.com/compras.json';  

  constructor( private httpClient: HttpClient ) { 

     console.log("SERVICIOS SERVICE ---- Invoca el servicio compras....... Ver:0936")


  }

  // Get Consulta Compras
  cargar() {
   
    return this.httpClient.get<Compras>( this.url )
         .pipe(
            map(  this.crearArreglo )
         );
    

  }

  // Put Crear Compras
   crear( compras:Compras ) {
   

    console.log("---- > ADICIONAR COMPRAS");
    console.log(compras)
    return this.httpClient.post( this.url, compras );

  }


  private crearArreglo( comprasObj: object   )  {

    const compras: Compras[] = [];
    let listProd: ListaProducto[] = [];
 
    if ( comprasObj === null ) return [];
   
 
     Object.keys(comprasObj).forEach( key => {
       
     const compra: Compras = comprasObj[key];   

     
     // --------------------------  Convertir lista de productos de objeto a array
     const productos: ListaProducto[] = [];

     Object.keys(compra.listProd).forEach( key => {
        
      const producto: ListaProducto = compra.listProd[key];
   
      productos.push( producto );
   
     });

     // Asigna el array de productos a la lista de productos en el json
     compra.listProd = productos;

     compras.push( compra );
 
    }); 

    return compras;

 }

 // ----------------------------- LOGICA COMPRAS -----------------------------

 // Adicionar una compra producto 
 // 1. Existe Producto
 // 1.1. NO - Adicionar producto a la compra
 // 1.2. SI - Modificar la cantidad aumentar en uno 
 adicionarCompra( compra:Compras, productos:IProductos[], indice:number ) {


  // debugger
  let date: Date = new Date();
  let dateFormato = date.getDate() + "/" +  (date.getMonth()+1) + "/" + date.getFullYear();
  console.log("Date = " + date);

  // Valida si el inventario es menor a 1. Para no seguir con la TX.
  if ( productos[indice].cantidadInv < 1 ) {
    return null;

  }

  if ( compra.IdCompra === null ) {
      
         console.log("ADCIONANDO TODO EL ITEM DE COMPRA "); 

         let productoNuevo: ListaProducto = {cantidad:0,descripcion:"",id:300,valor:0}
          
          compra.IdCompra = 9999;
          compra.fecha = dateFormato;
          this.crearProducto(compra, productos, indice); 


          
                           
        }
   else {
        
        console.log("YA EXISTE LA COMPRA SE DEBE ADICIONAR EL PRODUCTO ") 

        this.crearProducto(compra, productos, indice); 
        
        }


     return compra;    

 }


 // Crear o actualiza el producto en compras el nodo al arbol de compras
 crearProducto(  compra:Compras, productos:IProductos[], indice:number ) {

  let productoNuevo: ListaProducto = {cantidad:0,descripcion:"",id:300,valor:0}         
  
  let item =  this.buscarProductoCompra (compra, productos, indice);

  // Se encuentra el producto aumenta la cantidad en 1
  if ( item.length > 0 ) {
    item[0].cantidad = item[0].cantidad + 1 ;
  }
  else { // No encuentra el producto lo adiciona y le asigna 1 cantidad
    productoNuevo.id = productos[indice].Id;
    productoNuevo.cantidad = 1;
    productoNuevo.descripcion = productos[indice].nombre;
    productoNuevo.valor = productos[indice].valor
    compra.listProd.push(productoNuevo);
  }

  // Disminuir en uno la cantidad del producto
  productos[indice].cantidadInv = productos[indice].cantidadInv - 1; 
  
 }


 // Elimina el producto de la compra y reversa la cantidad en productos.
 eliminarProducto(  compra:Compras,productos:IProductos[], productoItem:ListaProducto, idx:number ) {


     let itemProducto =  this.buscarProductoLista (compra, productos, productoItem);

    // Se encuentra el producto reversa la cantidad de productos al inventario
    // Elimina lel producto de la lista de compras
    if ( itemProducto.length > 0 ) {
      itemProducto[0].cantidadInv = itemProducto[0].cantidadInv + compra.listProd[idx].cantidad ;
      compra.listProd.splice(idx,1);
  
    }
  



  
 }





 // Buscar el producto dentro de la compra dentro del array y retorna el identificador
 private buscarProductoCompra (compra:Compras, productos:IProductos[], indice:number) {

  let item = compra.listProd.filter(element => element.id == productos[indice].Id );
  if ( item.length > 0 ) {
    console.log("Item Producto CARRO  SI encontrado ACTUALIZA");   
  }
  else {
    console.log("Item Producto CARRO  NO encontrado INSERTA");     
  }

  return item;

 }


  // Buscar el producto dentro de la lista de productos
  private buscarProductoLista (compra:Compras,productos:IProductos[], productoItem:ListaProducto) {


    let item = productos.filter(element => element.Id == productoItem.id );

    if ( item.length > 0 ) {
      console.log("Item Producto de la lista de productos ");   
    }
  
    return item;
  
   }
  

 // Actualizar la cantidad del producto 
 private actualizarCantidad () {
   

 }




} 
