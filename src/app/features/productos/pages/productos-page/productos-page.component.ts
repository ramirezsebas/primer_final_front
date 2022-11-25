import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Producto } from '../../models/producto.model';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-productos-page',
  templateUrl: './productos-page.component.html',
  styleUrls: ['./productos-page.component.scss']
})
export class ProductosPageComponent implements OnInit {


  displayedColumns: string[] = ['codigo', 'nombre', 'precio_venta', 'existencia', 'acciones'];
  dataSource = new MatTableDataSource<Producto>([]);

  constructor(private productosService: ProductosService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource.data = this.productosService.getProductos();
  }

  editar(producto: Producto) {
    console.log(producto);
  }

  eliminar(producto: Producto) {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar el producto?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.deleteProducto(producto.codigo);
        Swal.fire(`Eliminado el producto ${producto.codigo}!`, '', 'success')
      }
    })
  }

}
