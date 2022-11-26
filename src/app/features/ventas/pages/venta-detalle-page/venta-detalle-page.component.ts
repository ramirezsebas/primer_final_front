import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { VentaDialogComponent } from '../../components/venta-dialog/venta-dialog.component';
import { DetalleVenta } from '../../models/detalle_venta.model';
import { DetalleVentasService } from '../../services/detalle-ventas.service';

@Component({
  selector: 'app-venta-detalle-page',
  templateUrl: './venta-detalle-page.component.html',
  styleUrls: ['./venta-detalle-page.component.scss']
})
export class VentaDetallePageComponent implements OnInit {

  displayedColumns: string[] = ['producto', 'cliente', 'fecha', 'total'];
  dataSource = new MatTableDataSource<DetalleVenta>([]);

  constructor(private detalleVentasService: DetalleVentasService, private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  openDialog(detalleVenta: DetalleVenta | null): void {
    const dialogRef = this.dialog.open(VentaDialogComponent, {
      width: '250px',
      data: detalleVenta
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (detalleVenta) {
          this.detalleVentasService.updateDetalleVentas(detalleVenta.cliente.ruc, result);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se ha actualizado el detalleVenta correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          this.detalleVentasService.createDetalleVentas(result);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se ha creado el detalleVenta correctamente',
            showConfirmButton: false,
            timer: 1500
          })

        }
      }
    });
  }

  ngOnInit(): void {
    this.dataSource.data = this.detalleVentasService.getDetalleVentass();
    this.detalleVentasService.refresh$.subscribe(() => {
      this.dataSource.data = this.detalleVentasService.getDetalleVentass();
    });
  }

  editar(detalleVenta: DetalleVenta) {
    this.openDialog(detalleVenta);
  }

  agregar() {
    this.openDialog(null);
  }

  eliminar(detalleVenta: DetalleVenta) {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar el detalleVenta?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        let deletedCaja = this.detalleVentasService.deleteDetalleVentas(detalleVenta.cliente.ruc);
        if (!deletedCaja) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `No existe el detalleVenta con el factura ${detalleVenta.cliente.ruc}`,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha eliminado el detalleVenta con el factura ${detalleVenta.cliente.ruc}`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    })
  }

}
