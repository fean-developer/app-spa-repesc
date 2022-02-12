import { Repescs } from 'src/app/models/repescs';
import { DICTIONARY_VIEW_DATA } from './../constants/generate-customers.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomersService } from './../../../services/customers.service';
import { Customers } from 'src/app/models/customers';
import { Component, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersComponent } from '../../customers/customers.component';
import { FormaData } from 'src/app/_helpers/format.data';
import { RepescsService } from 'src/app/services/repescs.service';


@Component({
  selector: 'app-dialog-generate-customers',
  templateUrl: './dialog-generate-customers.component.html',
  styleUrls: ['./dialog-generate-customers.component.scss'],
})
export class DialogGenerateCustomersComponent {
  public loading!: boolean;
  public newAddedCustomer!: Customers;
  public customer!: Customers;
  public repesc!: Repescs[];
  public byRepesc!: boolean;
  public byForm!: boolean;

  public formCreate!: FormGroup;
  public disclaimeData: string = '';
  public created = new EventEmitter<Customers>();

  constructor(
    public dialogRef: MatDialogRef<CustomersComponent>,
    private customerService: CustomersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private formatData: FormaData,
    private repescService: RepescsService,
  ) {}

  get notice() { return DICTIONARY_VIEW_DATA.create_notice }
  get frm() { return this.formCreate.controls }
  get cerate_data_constant() {
    return this.byRepesc 
    ? DICTIONARY_VIEW_DATA.create_with_input
    : DICTIONARY_VIEW_DATA.create_without_input;
  }

  ngOnInit() {
    if (this.byRepesc) {
      this.createForm();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.dialogRef.componentInstance.customer = this.data;
  }

  generate() {
    this.loading = true;
    this.customerService.generateOneCustomer()
      .subscribe((e) => {
        this.customer = e;
        if (e) {
          this.loading = false;
          this.customer = this.data.repesc == null ?  e : this.data
        }
      });
  }

  createForm() {
    let inputRepescInvalid = this.data?.repesc === '?????' ? null : this.data?.repesc;
    this.formCreate = this.builder.group({
      repesc: [inputRepescInvalid, [Validators.required, Validators.minLength(5)]]
    });
     this.formCreate.get('repesc')?.patchValue(this.frm.repesc.value)
  }

  onCreateCustomer() {
    if (this.byRepesc && this.formCreate.valid) {
      this.loading = true;
      let code = this.formatData.uppercase(this.frm.repesc.value);
      let repesc!: string | undefined;
      repesc = this.data.list.find((el: { code: string; }) => el.code == code).code;
      if (repesc != undefined) {
        this.customerService.generateCustomer(`${code}`)
          .subscribe((e) => {
            this.customer = e;
            if (e) {
              this.loading = false;
              this.data = e;
            }
          });
      } else {
        this.formCreate.setErrors({ repescNotFound: true });
        this.loading = false;
      }
    }
  }
}
