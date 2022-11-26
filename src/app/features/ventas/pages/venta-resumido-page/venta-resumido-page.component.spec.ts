import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaResumidoPageComponent } from './venta-resumido-page.component';

describe('VentaResumidoPageComponent', () => {
  let component: VentaResumidoPageComponent;
  let fixture: ComponentFixture<VentaResumidoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaResumidoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaResumidoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
