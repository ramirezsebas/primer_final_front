import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Subject } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientes: Cliente[] = [];
  refresh$ = new Subject<void>();

  constructor() {
    this.initProductos();
  }

  private addProductosToLocalstorage() {
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
  }

  private initProductos() {
    if (localStorage.getItem('clientes') == null) {
      for (let index = 0; index < 350; index++) {
        this.clientes.push({
          ruc: faker.finance.account(),
          nombre: faker.name.firstName(),
          apellido: faker.name.lastName(),
          email: faker.internet.email(),
        });
      }
      this.addProductosToLocalstorage();
    } else {
      this.clientes = this.getProductosFromLocalStorage();
    }
  }

  private getProductosFromLocalStorage(): Cliente[] {
    return JSON.parse(localStorage.getItem('clientes') || '[]');
  }


  getProductos(): Cliente[] {
    return this.getProductosFromLocalStorage();
  }



  getProducto(ruc: string): Cliente | null {
    const cliente = this.getProductos().find(p => p.ruc === ruc);
    if (!cliente) {
      return null;
    }
    return cliente;

  }



  createProducto(cliente: Cliente): Cliente | null {
    const productoExists = this.clientes.find(p => p.ruc === cliente.ruc);
    if (productoExists) {
      return null;
    }
    this.clientes.push(cliente);
    this.addProductosToLocalstorage();
    this.refresh$.next();
    return cliente;
  }


  updateProducto(idProducto: string, cliente: Cliente): Cliente | null {
    const productoExists = this.clientes.find(p => p.ruc === idProducto);
    if (!productoExists) {
      return null;
    }
    this.clientes = this.clientes.map(p => {
      if (p.ruc === idProducto) {
        return cliente;
      }
      return p;
    });

    this.addProductosToLocalstorage();
    this.refresh$.next();

    return cliente;
  }



  deleteProducto(ruc: string): Cliente | null {

    const cliente = this.clientes.find(p => p.ruc === ruc);
    if (!cliente) {
      return null;
    }
    this.clientes = this.clientes.filter(p => p.ruc !== ruc);
    this.addProductosToLocalstorage();
    this.refresh$.next();

    return cliente;
  }

}
