import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Subject } from 'rxjs';
import { Producto } from '../../productos/models/producto.model';
import { DetalleVenta } from '../models/detalle_venta.model';
import * as uuid from 'uuid';
import { Cliente } from '../../clientes/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class DetalleDetalleVentassService {

  detalleVentas: DetalleVenta[] = [];
  refresh$ = new Subject<void>();

  constructor() {
    this.initDetalleVentass();
  }

  private addDetalleVentassToLocalstorage() {
    localStorage.setItem('detalle-ventas', JSON.stringify(this.detalleVentas));
  }

  private initDetalleVentass() {
    if (localStorage.getItem('detalle-ventas') == null) {
      for (let index = 0; index < 1000; index++) {
        let clientesFromLocalStorage: Cliente[] = JSON.parse(localStorage.getItem('clientes') || '[]');
        let productosFromLocalStorage: Producto[] = JSON.parse(localStorage.getItem('productos') || '[]');
        let randomProductoFromLocalStorgae: Producto = productosFromLocalStorage[Math.floor(Math.random() * productosFromLocalStorage.length)];
        let randomClienteFromLocalStorage: Cliente = clientesFromLocalStorage[Math.floor(Math.random() * clientesFromLocalStorage.length)];
        this.detalleVentas.push({
          cantidad: Number(faker.finance.amount()),
          cliente: randomClienteFromLocalStorage,
          fecha: faker.date.past(),
          producto: randomProductoFromLocalStorgae,
          total: Number(faker.finance.amount()),
        });

      }
      this.addDetalleVentassToLocalstorage();
    } else {
      this.detalleVentas = this.getDetalleVentassFromLocalStorage();
    }
  }

  private getDetalleVentassFromLocalStorage(): DetalleVenta[] {
    return JSON.parse(localStorage.getItem('detalle-ventas') || '[]');
  }


  getDetalleVentass(): DetalleVenta[] {
    return this.getDetalleVentassFromLocalStorage();
  }



  getDetalleVentas(ruc: string): DetalleVenta | null {
    const venta = this.getDetalleVentass().find(p => p.cliente.ruc === ruc);
    if (!venta) {
      return null;
    }
    return venta;

  }



  createDetalleVentas(venta: DetalleVenta): DetalleVenta | null {
    const ventaExists = this.detalleVentas.find(p => p.cliente.ruc === venta.cliente.ruc);
    if (ventaExists) {
      return null;
    }
    this.detalleVentas.push(venta);
    this.addDetalleVentassToLocalstorage();
    this.refresh$.next();
    return venta;
  }


  updateDetalleVentas(idDetalleVentas: string, venta: DetalleVenta): DetalleVenta | null {
    const ventaExists = this.detalleVentas.find(p => p.cliente.ruc === idDetalleVentas);
    if (!ventaExists) {
      return null;
    }
    this.detalleVentas = this.detalleVentas.map(p => {
      if (p.cliente.ruc === idDetalleVentas) {
        return venta;
      }
      return p;
    });

    this.addDetalleVentassToLocalstorage();
    this.refresh$.next();

    return venta;
  }



  deleteDetalleVentas(ruc: string): DetalleVenta | null {

    const venta = this.detalleVentas.find(p => p.cliente.ruc === ruc);
    if (!venta) {
      return null;
    }
    this.detalleVentas = this.detalleVentas.filter(p => p.cliente.ruc !== ruc);
    this.addDetalleVentassToLocalstorage();
    this.refresh$.next();

    return venta;
  }
}
