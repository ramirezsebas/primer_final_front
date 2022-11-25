import { Injectable } from '@angular/core';
import { delay, from, Observable, of } from 'rxjs';
import { Producto } from '../models/producto.model';
import * as uuid from 'uuid';
import { faker } from '@faker-js/faker';

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
    for (let index = 0; index < 1000; index++) {
      this.productos.push({
        codigo: uuid.v4(),
        nombre: faker.commerce.product(),
        precioVenta: Number(faker.commerce.price()),
        existencia: faker.datatype.number(100),
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


  updateProducto(idProducto: string, producto: Producto): Producto | null {
    const productoExists = this.productos.find(p => p.codigo === idProducto);
    if (!productoExists) {
      return null;
    }
    this.productos = this.productos.map(p => {
      if (p.codigo === idProducto) {
        return producto;
      }
      return p;
    });

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
