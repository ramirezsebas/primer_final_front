import { Cliente } from "../../clientes/models/cliente.model";

export interface Venta {
  cliente: Cliente;
  fecha: Date;
  total: number;
  factura: string;
}