import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaResumidoPageComponent } from './pages/venta-resumido-page/venta-resumido-page.component';
import { VentaDialogComponent } from './components/venta-dialog/venta-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { VentaDetallePageComponent } from './pages/venta-detalle-page/venta-detalle-page.component';



@NgModule({
  declarations: [
    VentaResumidoPageComponent,
    VentaDialogComponent,
    VentaDetallePageComponent
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
    MatInputModule,

  ]
})
export class VentasModule { }
