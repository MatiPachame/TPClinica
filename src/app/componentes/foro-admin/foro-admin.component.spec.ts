import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoAdminComponent } from './foro-admin.component';

describe('ForoAdminComponent', () => {
  let component: ForoAdminComponent;
  let fixture: ComponentFixture<ForoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForoAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
