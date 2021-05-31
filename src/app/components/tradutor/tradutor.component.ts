import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Repescs } from 'src/app/models/repescs';
import { RepescsService } from 'src/app/services/repescs.service';
import { Sort } from '@angular/material/sort';
import { delay, first } from 'rxjs/operators';
import { StylesService } from 'src/app/services/styles.service';



@Component({
  selector: 'app-tradutor',
  templateUrl: './tradutor.component.html',
  styleUrls: ['./tradutor.component.scss']
})
export class TradutorComponent implements OnInit {


  public repescs: Repescs[] = [];
  public rowEditable!: Repescs;
  public sorted!: Repescs[];
  public updateForm!: FormGroup;
  @Input() public isEditable: boolean = false;
  changEditablValue = new EventEmitter();
  public avatarFirstLetter!: { firstName: string, lastName: string }
  public submitted!: boolean;

  public tableHeader = [
    { id: 'range_cpf_digit', text: '6 e & Digito' },
    { id: 'code', text: 'Repesc' },
    { id: 'forwardScreen', text: 'Desvio' },
    { id: 'description', text: 'Descrição' },
    { id: 'products.cp_puro', text: 'CP' },
    { id: 'products.cp_auto', text: 'AUTO' },
    { id: 'products.cp_moto', text: 'MOTO' },
    { id: 'products.cp_renda', text: 'RENDA' },
    { id: 'products.cdc', text: 'CDC' },
    { id: 'products.cartao', text: 'CARTAO' },

  ]
  public selectedData: any;



  constructor(
    private repescsServices: RepescsService,
    private formBuilder: FormBuilder,
    private stylesSevices: StylesService) {
    this.isEditable = false;
  }

  get frm() { return this.updateForm.controls }

  ngOnInit(): void {
    this.setPropertyStyle();
    this.getRepespcs();
    this.createForm();
  }

  private getRepespcs() {
    this.repescsServices.getAllRepescs()
      .subscribe(data => {
        this.repescs = data;
        this.sorted = this.repescs.slice();
      });
  }

  onRowClicked(row: any) {
    this.isEditable = true;
    this.selectedData = row;

    this.changEditablValue.emit({ editable: this.isEditable });
    if (row && !row.editable) {
      row.editable = this.isEditable;
    }
    this.rowEditable = row;
    this.setValues(row);
    this.avatarFirstLetter = { firstName: row.description.substr(0, 1), lastName: row.description };
  }

  public sortData(sort: Sort) {
    const data = this.repescs.slice();
    if (!sort.active || sort.direction === '') {
      this.sorted = data;
      return;
    }

    this.sorted = data.sort((a: Repescs, b: Repescs) => {
      const isAsc = sort.direction === 'desc';
      switch (sort.active) {
        case 'range_cpf_digit': return compare(a.range_cpf_digit, b.range_cpf_digit, isAsc);
        case 'code': return compare(a.code, b.code, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        case 'forwardScreen': return compare(a.forwardScreen as string, b.forwardScreen as string, isAsc);
        case 'products.cp_puro': return compare(a.products.cp_puro as string, b.products.cp_puro as string, isAsc);
        case 'products.cp_auto': return compare(a.products.cp_auto as string, b.products.cp_auto as string, isAsc);
        case 'products.cp_moto': return compare(a.products.cp_moto as string, b.products.cp_moto as string, isAsc);
        case 'products.cp_renda': return compare(a.products.cp_renda as string, b.products.cp_renda as string, isAsc);
        case 'products.cdc': return compare(a.products.cdc as string, b.products.cdc as string, isAsc);
        case 'products.cartao': return compare(a.products.cartao as string, b.products.cartao as string, isAsc);
        default: return 0;
      }
    });
  }


  private createForm() {
    this.updateForm = this.formBuilder.group({
      code: [null],
      description: [null],
      range_cpf_digit: [null],
      forwardScreen: [null],
      products: this.formBuilder.group({
        cartao: [null],
        cp_auto: [null],
        cp_moto: [null],
        cp_puro: [null],
        cp_renda: [null],
        cdc: [null]
      })
    });
  }

  setValues(repesc: Repescs) {

    this.updateForm.patchValue({
      code: repesc.code,
      description: repesc.description,
      range_cpf_digit: repesc.range_cpf_digit,
      forwardScreen: repesc.forwardScreen
    });

    let products = {
      cartao: repesc.products.cartao,
      cp_auto: repesc.products.cp_auto,
      cp_moto: repesc.products.cp_moto,
      cp_puro: repesc.products.cp_puro,
      cp_renda: repesc.products.cp_renda,
      cdc: repesc.products.cdc
    }
    this.updateForm.get('products')?.patchValue(products);
  }

  onSubmit() {
    this.submitted = true;

    this.repescsServices.update(this.rowEditable.code, this.updateForm.value)
      .pipe(delay(0), first())
      .subscribe({
        next: () => {
          this.getRepespcs();
        },
        error: error => {
          console.log(error)
        }
      });
  }

  public setPropertyStyle(): void {
    this.stylesSevices.style([
      { style: '--row-colored', value: 'rgb(240, 221, 193, 1)', },
      { style: '--drawer-background-color', value: 'rgb(1, 149, 150,1)', },
      { style: '--drawer-avatar-background-color', value: 'rgb(1, 149, 150,1)', },
      { style: '--drawer-avatar-color', value: 'rgb(255, 255, 255, 1)', },
    ]);
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

