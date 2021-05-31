import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataTradutorComponent } from './form-data-tradutor.component';

describe('FormDataTradutorComponent', () => {
  let component: FormDataTradutorComponent;
  let fixture: ComponentFixture<FormDataTradutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDataTradutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDataTradutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
