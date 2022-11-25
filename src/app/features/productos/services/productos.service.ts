import { Injectable } from '@angular/core';
import { delay, from, Observable, of } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos: Producto[] = [];

  constructor() {
    this.initProductos();
  }

  private initProductos() {
    for (let index = 0; index < 50; index++) {
      this.productos.push({
        codigo: `codigo-${index}`,
        nombre: `nombre-${index}`,
        precioVenta: 102 * 2 + index,
        existencia: 10
      });
    }
  }


  getProductos(): Producto[] {
    return this.productos;
    // return of(this.productos).pipe(delay(4000));
  }



  getProducto(codigo: string): Observable<Producto | null> {
    let producto = this.productos.find(p => p.codigo === codigo);
    if (!producto) {
      return of(null);
    }
    return of(producto).pipe(delay(4000));
  }



  createProducto(producto: Producto): Observable<Producto> {
    this.productos.push(producto);
    return of(producto).pipe(delay(4000));
  }


  updateProducto(producto: Producto): Observable<Producto | null> {
    const index = this.productos.findIndex(p => p.codigo === producto.codigo);
    if (index === -1) {
      return of(null);
    }
    this.productos[index] = producto;
    return of(producto).pipe(delay(4000));
  }



  deleteProducto(codigo: string): Observable<Producto | null> {
    const producto = this.productos.find(p => p.codigo === codigo);
    if (!producto) {
      return of(null);
    }

    if (producto.existencia === 0) {
      return of(null);
    }

    this.productos = this.productos.filter(p => p.codigo !== codigo);

    return of(producto).pipe(delay(4000));
  }


}
