
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../models/producto.model';


@Component({
  selector: 'app-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.scss']
})
export class ProductoDialogComponent {
  myForm!: FormGroup;


  ngOnInit(): void {
    this.myForm = this.fb.group({
      nombre: [this.producto?.nombre ?? "", Validators.required],
      precioVenta: [this.producto?.precioVenta ?? "", Validators.required],
      existencia: [this.producto?.existencia ?? "", Validators.required],
    });
  }

  constructor(
    public dialogRef: MatDialogRef<ProductoDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public producto: Producto | null,
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
