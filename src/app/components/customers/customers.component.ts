import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogGenerateCustomersComponent } from './../dialogs/dialog-generate-customers/dialog-generate-customers.component';
import { BottomSheetComponent } from './../bottom-sheet/bottom-sheet.component';
import { StylesService } from 'src/app/services/styles.service';
import { CustomersService } from './../../services/customers.service';
import { Customers } from './../../models/customers';
import { Component, ViewChild, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RepescsService } from 'src/app/services/repescs.service';
import { Repescs } from 'src/app/models/repescs';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {

  public customers: Customers[] = [];
  public repescs!: Repescs[];
  public repescdata!: Repescs;
  public subscribe!: Observable<Repescs>;

  displayedColumns: string[] = ['nome'];
  public dataSource!: MatTableDataSource<Customers>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(Customers) selectedData!: Customers;
  public avatarFirstLetter!: { firstName: string, lastName: string }
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public isLoading: boolean = false;

  constructor(
    private service: CustomersService,
    private repescService: RepescsService,
    private stylesServices: StylesService,
    private clipboard: Clipboard,
    private _snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listCustomers()
  }

  listCustomers(): void {
    this.setPropertyStyle();
    this.isLoading = true;
    this.retrieveRepescs();
    this.service.getAllCustomers()
      .subscribe(data => {
        this.customers = data;
        this.dataSource = new MatTableDataSource(this.customers);
        this.customers.map((row) => {
          row.repescData = this.repescs.find((el) => el.code == row.repesc)
        });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false
      })
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
    this.dialog._getAfterAllClosed()
      .subscribe(
        () => this.listCustomers()
      )
  }

  retrieveRepescs() {
    this.repescService.getAllRepescs()
      .subscribe(el => {
        this.repescs = el as any;
      });
  }

  public copyToClipboard(value?: string) {
    this.clipboard.copy(value!);
    this.openSnackBar();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private openSnackBar() {
    this._snackBar.open('Documento copiado', 'Entendi', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 6000
    });
  }

  onRowClicked(row: any) {
    row.repesc as Repescs;
    this.selectedData = row;
    this.avatarFirstLetter = { firstName: row.nome.substr(0, 1), lastName: row.nome.substr(1) };
  }

  public setPropertyStyle(): void {
    this.stylesServices.style([
      { style: '--row-colored', value: 'rgb(240, 221, 193, 1)', },
      { style: '--drawer-background-color', value: 'rgb(1, 149, 150,1)', },
      { style: '--drawer-avatar-background-color', value: 'rgb(1, 149, 150,1)', },
      { style: '--drawer-avatar-color', value: 'rgb(255, 255, 255, 1)', },
    ]);
  }


}