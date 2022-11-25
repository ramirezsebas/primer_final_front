import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosPageComponent } from './pages/productos-page/productos-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [

    ProductosPageComponent
  ],
  imports: [
    CommonModule,

    MatIconModule,
    MatTableModule,
    MatPaginatorModule

  ]
})
export class ProductosModule { }
