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

  private addProductosToLocalstorage() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  private initProductos() {
    for (let index = 0; index < 100; index++) {
      this.productos.push({
        codigo: `codigo-${index}`,
        nombre: `nombre-${index}`,
        precioVenta: 102 * 2 + index,
        existencia: 10
      });
    }
    if (localStorage.getItem('productos') == null) {
      this.addProductosToLocalstorage();
    }
  }

  private getProductosFromLocalStorage(): Producto[] {
    return JSON.parse(localStorage.getItem('productos') || '[]');
  }


  getProductos(): Producto[] {
    return this.getProductosFromLocalStorage();
  }



  getProducto(codigo: string): Producto | null {
    const producto = this.getProductos().find(p => p.codigo === codigo);
    if (!producto) {
      return null;
    }
    return producto;

  }



  createProducto(producto: Producto): Producto | null {
    const productoExists = this.productos.find(p => p.codigo === producto.codigo);
    if (productoExists) {
      return null;
    }
    this.productos.push(producto);
    this.addProductosToLocalstorage();
    return producto;
  }


  updateProducto(producto: Producto): Producto | null {
    const productoExists = this.productos.find(p => p.codigo === producto.codigo);
    if (!productoExists) {
      return null;
    }
    this.productos = this.productos.map(p => p.codigo === producto.codigo ? producto : p);
    this.addProductosToLocalstorage();
    return producto;
  }



  deleteProducto(codigo: string): Producto | null {
    const producto = this.productos.find(p => p.codigo === codigo);
    if (!producto) {
      return null;
    }
    this.productos = this.productos.filter(p => p.codigo !== codigo);
    this.addProductosToLocalstorage();
    return producto;
  }


}
