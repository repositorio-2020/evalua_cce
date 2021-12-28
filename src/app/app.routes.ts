import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ProductoComponent } from "./components/producto/producto.component";
import { ComprasComponent } from "./components/compras/compras.component";
import { ProductosComponent } from "./components/productos/productos.component";



const APP_ROUTES: Routes = [

    { path: 'home', component: HomeComponent  },
    { path: 'about', component: AboutComponent  },
    { path: 'productos', component: ProductosComponent },
    { path: 'producto/:id', component: ProductoComponent},
    { path: 'compras', component: ComprasComponent},
    { path: 'buscador/:termino', component: BuscadorComponent  },
    { path: '**', pathMatch: 'full', redirectTo: 'productos'  }


];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES)