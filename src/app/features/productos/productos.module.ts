import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosPageComponent } from './pages/productos-page/productos-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { ProductoDialogComponent } from './components/producto-dialog/producto-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductosPageComponent,
    ProductoDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule


  ]
})
export class ProductosModule { }
