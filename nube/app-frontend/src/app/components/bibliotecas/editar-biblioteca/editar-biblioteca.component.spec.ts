import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBibliotecaComponent } from './editar-biblioteca.component';

describe('EditarBibliotecaComponent', () => {
  let component: EditarBibliotecaComponent;
  let fixture: ComponentFixture<EditarBibliotecaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarBibliotecaComponent]
    });
    fixture = TestBed.createComponent(EditarBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
