import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTradutorComponent } from './upload-tradutor.component';

describe('UploadTradutorComponent', () => {
  let component: UploadTradutorComponent;
  let fixture: ComponentFixture<UploadTradutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadTradutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTradutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
