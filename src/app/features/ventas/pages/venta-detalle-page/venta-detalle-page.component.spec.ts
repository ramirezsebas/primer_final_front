import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaDetallePageComponent } from './venta-detalle-page.component';

describe('VentaDetallePageComponent', () => {
  let component: VentaDetallePageComponent;
  let fixture: ComponentFixture<VentaDetallePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaDetallePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaDetallePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
