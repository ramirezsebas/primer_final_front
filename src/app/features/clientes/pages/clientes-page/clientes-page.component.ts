import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ClienteDialogComponent } from '../../components/cliente-dialog/cliente-dialog.component';
import { Cliente } from '../../models/cliente.model';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientes-page',
  templateUrl: './clientes-page.component.html',
  styleUrls: ['./clientes-page.component.scss']
})
export class ClientesPageComponent implements OnInit {
  displayedColumns: string[] = ['ruc', 'nombre', 'apellido', 'email', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>([]);

  constructor(private clienteService: ClientesService, private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  openDialog(cliente: Cliente | null): void {
    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '250px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (cliente) {
          this.clienteService.updateProducto(cliente.ruc, result);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se ha actualizado el cliente correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          this.clienteService.createProducto(result);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se ha creado el cliente correctamente',
            showConfirmButton: false,
            timer: 1500
          })

        }
      }
    });
  }

  ngOnInit(): void {
    this.dataSource.data = this.clienteService.getProductos();
    this.clienteService.refresh$.subscribe(() => {
      this.dataSource.data = this.clienteService.getProductos();
    });
  }

  editar(cliente: Cliente) {
    this.openDialog(cliente);
  }

  agregar() {
    this.openDialog(null);
  }

  eliminar(cliente: Cliente) {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar el cliente?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        let deletedCaja = this.clienteService.deleteProducto(cliente.ruc);
        if (!deletedCaja) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `No existe el cliente con el codigo ${cliente.ruc}`,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha eliminado el cliente con el codigo ${cliente.ruc}`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    })
  }
}
