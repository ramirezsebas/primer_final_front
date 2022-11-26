import { Cliente } from "../../clientes/models/cliente.model";
import { Producto } from "../../productos/models/producto.model";

export interface DetalleVenta {
  cliente: Cliente;
  fecha: Date;
  producto: Producto;
  total: number;
  cantidad: number;
}