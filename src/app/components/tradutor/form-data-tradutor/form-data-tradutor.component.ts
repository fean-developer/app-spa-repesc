import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-data-tradutor',
  templateUrl: './form-data-tradutor.component.html',
  styleUrls: ['./form-data-tradutor.component.scss']
})
export class FormDataTradutorComponent implements OnInit {

  public updateForm!: FormGroup;
  get frm() { return this.updateForm.controls }

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit() {
    
  }
}
