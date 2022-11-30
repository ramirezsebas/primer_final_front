import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/features/clientes/models/cliente.model';
import * as uuid from 'uuid';
import { Venta } from '../../models/venta.model';

@Component({
  selector: 'app-venta-dialog',
  templateUrl: './venta-dialog.component.html',
  styleUrls: ['./venta-dialog.component.scss']
})
export class VentaDialogComponent implements OnInit {

  myForm!: FormGroup;


  ngOnInit(): void {
    this.myForm = this.fb.group({
      cliente: [this.venta?.cliente?.nombre ?? "", Validators.required],
      factura: [this.venta?.factura ?? "", Validators.required],
      fecha: [this.venta?.fecha ?? new Date(), Validators.required],
      total: [this.venta?.total ?? "", Validators.required],
    });
  }

  constructor(
    public dialogRef: MatDialogRef<VentaDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public venta: Venta | null,
  ) { }


  onClick() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const cliente: Cliente = {
      ruc: uuid.v4(),
      nombre: this.myForm.value.cliente,
      apellido: "Gomez",
      email: "random@gmail.com",
    };
    const form = {
      ...this.myForm.value,
      cliente,
    };
    this.dialogRef.close(form);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
