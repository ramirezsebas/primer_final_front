import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesPageComponent } from './features/clientes/pages/clientes-page/clientes-page.component';
import { ProductosPageComponent } from './features/productos/pages/productos-page/productos-page.component';
import { VentaResumidoPageComponent } from './features/ventas/pages/venta-resumido-page/venta-resumido-page.component';

const routes: Routes = [
  {
    path: 'productos',
    component: ProductosPageComponent,
  },
  {
    path: 'clientes',
    component: ClientesPageComponent,
  },
  {
    path: 'ventas',
    component: VentaResumidoPageComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
