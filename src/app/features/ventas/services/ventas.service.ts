import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Subject } from 'rxjs';
import { Venta } from '../models/venta.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  ventas: Venta[] = [];
  refresh$ = new Subject<void>();

  constructor() {
    this.initVentas();
  }

  private addVentasToLocalstorage() {
    localStorage.setItem('ventas', JSON.stringify(this.ventas));
  }

  private initVentas() {
    if (localStorage.getItem('ventas') == null) {
      for (let index = 0; index < 1000; index++) {
        let clientesFromLocalStorage = JSON.parse(localStorage.getItem('clientes') || '[]');
        let randomClienteFromLocalStorage = clientesFromLocalStorage[Math.floor(Math.random() * clientesFromLocalStorage.length)];
        this.ventas.push({
          factura: faker.finance.account(),
          total: Number(faker.finance.amount()),
          fecha: faker.date.past(),
          cliente: randomClienteFromLocalStorage ?? {
            factura: uuid.v4(),
            nombre: faker.name.findName(),
            apellido: faker.name.lastName(),
            email: faker.internet.email(),
            ruc: faker.finance.account(),
          }
        });

      }
      this.addVentasToLocalstorage();
    } else {
      this.ventas = this.getVentasFromLocalStorage();
    }
  }

  private getVentasFromLocalStorage(): Venta[] {
    return JSON.parse(localStorage.getItem('ventas') || '[]');
  }


  getVentas(): Venta[] {
    return this.getVentasFromLocalStorage();
  }



  getVenta(factura: string): Venta | null {
    const venta = this.getVentas().find(p => p.factura === factura);
    if (!venta) {
      return null;
    }
    return venta;

  }



  createVenta(venta: Venta): Venta | null {
    const ventaExists = this.ventas.find(p => p.factura === venta.factura);
    if (ventaExists) {
      return null;
    }
    this.ventas.push(venta);
    this.addVentasToLocalstorage();
    this.refresh$.next();
    return venta;
  }


  updateVenta(idVenta: string, venta: Venta): Venta | null {
    const ventaExists = this.ventas.find(p => p.factura === idVenta);
    if (!ventaExists) {
      return null;
    }
    this.ventas = this.ventas.map(p => {
      if (p.factura === idVenta) {
        return venta;
      }
      return p;
    });

    this.addVentasToLocalstorage();
    this.refresh$.next();

    return venta;
  }



  deleteVenta(factura: string): Venta | null {

    const venta = this.ventas.find(p => p.factura === factura);
    if (!venta) {
      return null;
    }
    this.ventas = this.ventas.filter(p => p.factura !== factura);
    this.addVentasToLocalstorage();
    this.refresh$.next();

    return venta;
  }

}
