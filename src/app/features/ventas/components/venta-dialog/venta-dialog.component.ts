import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
      cliente: [this.venta?.cliente ?? "", Validators.required],
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
    this.dialogRef.close(this.myForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
