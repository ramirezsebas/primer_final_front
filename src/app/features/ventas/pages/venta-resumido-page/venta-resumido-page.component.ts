import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { VentaDialogComponent } from '../../components/venta-dialog/venta-dialog.component';
import { Venta } from '../../models/venta.model';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-venta-resumido-page',
  templateUrl: './venta-resumido-page.component.html',
  styleUrls: ['./venta-resumido-page.component.scss']
})
export class VentaResumidoPageComponent implements OnInit {

  displayedColumns: string[] = ['factura', 'cliente', 'fecha', 'total'];
  dataSource = new MatTableDataSource<Venta>([]);

  constructor(private ventasService: VentasService, private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  openDialog(venta: Venta | null): void {
    const dialogRef = this.dialog.open(VentaDialogComponent, {
      width: '250px',
      data: venta
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (venta) {
          this.ventasService.updateVenta(venta.factura, result);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se ha actualizado el venta correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          this.ventasService.createVenta(result);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se ha creado el venta correctamente',
            showConfirmButton: false,
            timer: 1500
          })

        }
      }
    });
  }

  ngOnInit(): void {
    this.dataSource.data = this.ventasService.getVentas();
    this.ventasService.refresh$.subscribe(() => {
      this.dataSource.data = this.ventasService.getVentas();
    });
  }

  editar(venta: Venta) {
    this.openDialog(venta);
  }

  agregar() {
    this.openDialog(null);
  }

  eliminar(venta: Venta) {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar el venta?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        let deletedCaja = this.ventasService.deleteVenta(venta.factura);
        if (!deletedCaja) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `No existe el venta con el factura ${venta.factura}`,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha eliminado el venta con el factura ${venta.factura}`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    })
  }

}
