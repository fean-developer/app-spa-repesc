import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGenerateCustomersComponent } from './dialog-generate-customers.component';

describe('DialogGenerateCustomersComponent', () => {
  let component: DialogGenerateCustomersComponent;
  let fixture: ComponentFixture<DialogGenerateCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGenerateCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGenerateCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
