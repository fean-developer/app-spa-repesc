import { AnimationItem } from 'lottie-web';
import { REPESC_TABLE_DICTIONARY } from './../dialogs/constants/repesc-table.constants';
import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Repescs } from 'src/app/models/repescs';
import { RepescsService } from 'src/app/services/repescs.service';
import { Sort } from '@angular/material/sort';
import { delay, first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UploadTradutorComponent } from './../dialogs/upload-tradutor/upload-tradutor.component';
import { DialogGenerateCustomersComponent } from '../dialogs/dialog-generate-customers/dialog-generate-customers.component';
import Context from 'src/app/_helpers/context-data';
import { AnimationOptions } from 'ngx-lottie';



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
  options: AnimationOptions = {
    path: 'assets/images/lottie/tradutor-load.json'
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '40%',
    margin: '30% auto',
  }

  animationCreated(animationItem: AnimationItem): void {}

  public tableHeader = [
    { id: 'range_cpf_digit', text: '6 e 7 Digito' },
    { id: 'code', text: 'Repesc' },
    { id: 'forwardScreen', text: 'Desvio' },
    // { id: 'description', text: 'Descrição' },
    { id: 'products.cp_puro', text: 'CP' },
    { id: 'products.cp_puro_deadline', text: 'CP Prazo Máximo' },
    { id: 'products.cp_auto', text: 'AUTO' },
    { id: 'products.cp_auto_deadline', text: 'AUTO Prazo Máximo' },
    { id: 'products.cp_moto', text: 'MOTO' },
    { id: 'products.cp_moto_deadline', text: 'MOTO Prazo Máximo' },
    { id: 'products.cp_renda', text: 'RENDA' },
    { id: 'products.cp_renda_deadline', text: 'RENDA Prazo Máximo' },
    { id: 'products.cdc', text: 'CDC' },
    { id: 'products.cdc_deadline', text: 'CDC Prazo Máximo' },
    { id: 'products.cartao', text: 'CARTAO' },
    { id: 'products.cartao_deadline', text: 'CARTAO Prazo Máximo' },
    { id: 'products.fgts', text: 'FGTS' },
    { id: 'products.fgts_deadline', text: 'FGTS Prazo Máximo' },


  ]
  public selectedData: any;
  public dictionary: any = REPESC_TABLE_DICTIONARY.GENERATE_CUSTOMER_DESCRIPTION;

  constructor(
    private repescsServices: RepescsService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _context: Context<Repescs[]>) {
    this.isEditable = false;
  }

  get frm() { return this.updateForm.controls }
  get user() { return this.userService.userValue}

  ngOnInit(): void {
   
    if(this._context.getContext()) {
      this.repescs = Object.assign(this.repescs, this._context.getContext());
      this.sorted = this.repescs.slice();
    } else {
      this.getRepespcs();
    }
  
    this.createForm();
    this.dialog._getAfterAllClosed().subscribe(() => this.repescs )
  }

  private async getRepespcs() {
    this.repescsServices.getAllRepescs()
      .subscribe(data => {
        this.repescs = data;
        this._context.setContext(this.repescs);
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
    this.avatarFirstLetter = { firstName: 'p', lastName: '' };
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
        // case 'description': return compare(a.description, b.description, isAsc);
        case 'forwardScreen': return compare(a.forwardScreen as string, b.forwardScreen as string, isAsc);
        case 'products.cp_puro': return compare(a.products.cp_puro as string, b.products.cp_puro as string, isAsc);
        case 'products.cp_puro_deadline': return compare(a.products.cp_puro_deadline as string, b.products.cp_puro_deadline as string, isAsc);
        case 'products.cp_auto': return compare(a.products.cp_auto as string, b.products.cp_auto as string, isAsc);
        case 'products.cp_auto_deadline': return compare(a.products.cp_auto_deadline as string, b.products.cp_auto_deadline as string, isAsc);
        case 'products.cp_moto': return compare(a.products.cp_moto as string, b.products.cp_moto as string, isAsc);
        case 'products.cp_moto_deadline': return compare(a.products.cp_moto_deadline as string, b.products.cp_moto_deadline as string, isAsc);
        case 'products.cp_renda': return compare(a.products.cp_renda as string, b.products.cp_renda as string, isAsc);
        case 'products.cp_renda_deadline': return compare(a.products.cp_renda_deadline as string, b.products.cp_renda_deadline as string, isAsc);
        case 'products.cdc': return compare(a.products.cdc as string, b.products.cdc as string, isAsc);
        case 'products.cdc_deadline': return compare(a.products.cdc_deadline as string, b.products.cdc_deadline as string, isAsc);
        case 'products.cartao': return compare(a.products.cartao as string, b.products.cartao as string, isAsc);
        case 'products.cartao_deadline': return compare(a.products.cartao_deadline as string, b.products.cartao_deadline as string, isAsc);
        case 'products.fgts': return compare(a.products.fgts as string, b.products.fgts as string, isAsc);
        case 'products.fgts_deadline': return compare(a.products.fgts_deadline as string, b.products.fgts_deadline as string, isAsc);
  
        default: return 0;
      }
    });
  }

  openDialog(event: MouseEvent, byRepesc?: boolean): void {
    this.dialog.open(UploadTradutorComponent, {
      panelClass: 'modal-container'
    });
  }

  openGenerateDialog(event: MouseEvent, byRepesc?: boolean, repesc?: string): void {
    const dialogRef = this.dialog.open(DialogGenerateCustomersComponent, {
      panelClass: 'modal-container',
      data: {
        ...{repesc},
        list: this.repescs
      }
    });

    if (byRepesc) dialogRef.componentInstance.byRepesc = true;
    
    dialogRef.afterClosed().subscribe(
      () => {
        dialogRef.componentInstance.byForm = false;
        dialogRef.componentInstance.byRepesc = false;
      }
    )
    event.preventDefault();
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
        error: error => {}
      });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

