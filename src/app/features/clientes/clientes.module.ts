import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesPageComponent } from './pages/clientes-page/clientes-page.component';
import { ClienteDialogComponent } from './components/cliente-dialog/cliente-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    ClientesPageComponent,
    ClienteDialogComponent,
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
export class ClientesModule { }
