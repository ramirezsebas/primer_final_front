import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosPageComponent } from './features/productos/pages/productos-page/productos-page.component';

const routes: Routes = [
  {
    path: 'productos',
    component: ProductosPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
