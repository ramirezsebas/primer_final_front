import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesPageComponent } from './features/clientes/pages/clientes-page/clientes-page.component';
import { ProductosPageComponent } from './features/productos/pages/productos-page/productos-page.component';

const routes: Routes = [
  {
    path: 'productos',
    component: ProductosPageComponent,
  },
  {
    path: 'clientes',
    component: ClientesPageComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
