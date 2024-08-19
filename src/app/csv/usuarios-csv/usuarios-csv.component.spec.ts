import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosCsvComponent } from './usuarios-csv.component';

describe('UsuariosCsvComponent', () => {
  let component: UsuariosCsvComponent;
  let fixture: ComponentFixture<UsuariosCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosCsvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuariosCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
