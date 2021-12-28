export interface Compras {
    IdCompra:       number;
    fecha:          string;
    listProd: ListaProducto[];
}

export interface ListaProducto {
    cantidad:    number;
    descripcion: string;
    id:          number;
    valor:       number;
}
