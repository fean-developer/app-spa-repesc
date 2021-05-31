import { Repescs } from './../../../models/repescs';
import { DICTIONARY_VIEW_DATA } from './../constants/generate-customers.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomersService } from './../../../services/customers.service';
import { Customers } from 'src/app/models/customers';
import { Component, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CustomersComponent } from '../../customers/customers.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormaData } from 'src/app/_helpers/format.data';
import { RepescsService } from 'src/app/services/repescs.service';
import { invalid } from '@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-dialog-generate-customers',
  templateUrl: './dialog-generate-customers.component.html',
  styleUrls: ['./dialog-generate-customers.component.scss'],
  providers: [FormaData]
})
export class DialogGenerateCustomersComponent {
  public loading!: boolean;

  public customer!: Customers;
  public repesc!: Repescs[];
  public byRepesc!: boolean;

  public formCreate!: FormGroup;
  public disclaimeData: string = ''
    ;
  public created = new EventEmitter<boolean>()

  constructor(
    public dialogRef: MatDialogRef<CustomersComponent>,
    private _bottomSheet: MatBottomSheet,
    private customerService: CustomersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private formatData: FormaData,
    private repescService: RepescsService,

  ) {

  }

  get notice() { return DICTIONARY_VIEW_DATA.create_notice }
  get frm() { return this.formCreate.controls }
  get cerate_data_constant() {
    if (this.byRepesc) {
      return DICTIONARY_VIEW_DATA.create_with_input;
    } else {
      return DICTIONARY_VIEW_DATA.create_without_input;
    }
  }

  ngOnInit() {
    if (this.byRepesc) {
      this.createForm();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
    this._bottomSheet.dismiss();
  }

  generate() {
    this.loading = true;
    this.customerService.generateOneCustomer()
      .subscribe((e) => {
        this.customer = e;
        if (e) {
          this.loading = false;
          this.data = e;
        }
      });
  }

  createForm() {
    this.formCreate = this.builder.group({
      repesc: [null, [Validators.required, Validators.minLength(5)]]
    });
    const repesc = this.formCreate.get('repesc')?.patchValue(this.frm.repesc.value)
  }



  onCreateCustomer() {

    if (this.byRepesc && this.formCreate.valid) {
      this.loading = true;

      let code = this.formatData.uppercase(this.frm.repesc.value);

      let repesc!: string | undefined;
      this.repescService.getAllRepescs()
        .subscribe(el => {
          this.repesc = el as any;
          repesc = this.repesc.find((el) => el.code == code)?.code;
          console.log(repesc)
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
        });

    }
  }


}
