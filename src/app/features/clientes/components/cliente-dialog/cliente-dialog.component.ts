import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.scss']
})
export class ClienteDialogComponent implements OnInit {

  myForm!: FormGroup;


  ngOnInit(): void {
    this.myForm = this.fb.group({
      ruc: [this.cliente?.ruc ?? "", Validators.required],
      nombre: [this.cliente?.nombre ?? "", Validators.required],
      apellido: [this.cliente?.apellido ?? "", Validators.required],
      email: [this.cliente?.email ?? "", Validators.required],
    });
  }

  constructor(
    public dialogRef: MatDialogRef<ClienteDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente | null,
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
