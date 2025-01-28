import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarBibliotecaComponent } from './registrar-biblioteca.component';

describe('RegistrarBibliotecaComponent', () => {
  let component: RegistrarBibliotecaComponent;
  let fixture: ComponentFixture<RegistrarBibliotecaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarBibliotecaComponent]
    });
    fixture = TestBed.createComponent(RegistrarBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
