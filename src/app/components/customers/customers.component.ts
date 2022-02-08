import { UserService } from './../../services/user.service';
import { CustomerUpdateComponent } from './../dialogs/customer-update/customer-update.component';
import { Customers } from 'src/app/models/customers';
import { DialogGenerateCustomersComponent } from './../dialogs/dialog-generate-customers/dialog-generate-customers.component';
import { FormaData } from 'src/app/_helpers/format.data';
import { DialogAlertComponent } from './../dialogs/dialog-alert/dialog-alert.component';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StylesService } from 'src/app/services/styles.service';
import { CustomersService } from './../../services/customers.service';
import { Component, ViewChild, OnInit, AfterViewInit, Input, AfterContentInit } from '@angular/core';
import {  finalize } from 'rxjs/operators';

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

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { User } from 'src/app/models/user';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit, AfterContentInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(Customers) selectedData!: Customers;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  displayedColumns: string[] = ['nome'];
  public dataSource!: MatTableDataSource<Customers>;
  public customers: Customers[] = [];
  public repescs!: Repescs[];
  public shared: boolean = false;

  public avatarFirstLetter!: { firstName: string, lastName: string }
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  public isLoading: boolean = false;
  public hasData: boolean = false;
  public dialogRef!: MatDialogRef<any>;
  public dialogGenerateRef!: MatDialogRef<any>;

  options: AnimationOptions = {
    path: '/assets/images/lottie/add-contact.json',
  };

  @Input() public customer!: Customers;
  
  public users!: Partial<User[]>;
  protected responseData: any;

  animationCreated(animationItem: AnimationItem): void {}

  constructor(
    private service: CustomersService,
    private repescService: RepescsService,
    private stylesServices: StylesService,
    private clipboard: Clipboard,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private dialogViewAndEditData: MatDialog,
    private fomatData: FormaData,
    private usersServices: UserService
  ) { 
  }

  ngAfterContentInit(): void {
    this.listCustomers();
    this.retrieveRepescs();
  }

  ngOnInit(): void {
    this.showUsers();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(DialogAlertComponent,{disableClose:true, data: { item : `<br /><br />CPF:  ${ this.fomatData.formatCpf(this.selectedData?.cpf)} <br /> ${this.selectedData?.nome}`}});
  }

  openModalDataAndUpdate() {
     this.dialogViewAndEditData.open(CustomerUpdateComponent, { 
      data: { 
        customer: this.selectedData, 
        user: this.users 
      }, 
      width: '100%',
      height: 'auto',
      disableClose: true
    });
  }

  openGenerateDialog(event: MouseEvent, byRepesc?: boolean, byForm?: boolean): void {
    const dialogRef = this.dialog.open(DialogGenerateCustomersComponent, {
      panelClass: 'modal-container',
    });

    if (byRepesc) dialogRef.componentInstance.byRepesc = true;
    if (byForm && !byRepesc) dialogRef.componentInstance.byForm = true;
    
    dialogRef.afterClosed().subscribe(
      () => {
        dialogRef.componentInstance.byForm = false;
        dialogRef.componentInstance.byRepesc = false;
        this.customers.push(dialogRef.componentInstance.customer);
      }
    )
    event.preventDefault();
  }

  showUsers() {
    this.usersServices.listUsers()
    .subscribe((users) => {
      this.users = users;
    })
  }

  listCustomers(): void {
    this.service.getAllCustomers()
     .subscribe(data => {
        this.customers = data;
        this.customers.filter((row) => {
          row.repescData = this.repescs.find((el) => el.code == row.repesc)
        });
        this.isLoading = false
        this.hasData = this.customers.length > 0 ? true : false;
        this.updateDataSource()
      });
  }
 
  updateDataSource() {
    this.dataSource = new MatTableDataSource(this.customers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openSharedCustomer() {
    this.shared = !this.shared;
  }

  deleteCustomer(id?: string) {
    this.openDialog();
    const modal = this.dialogRef.afterClosed()
      .pipe(
        finalize(() => {
          this.sidenav.close();
        })).subscribe(
          () => {
            if (this.dialogRef.componentInstance.agree) {
              this.service.deleteCustomer(id).subscribe(
                () => {
                  this._snackBar.open('Cliente deletado', '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    panelClass: 'info',
                    duration: 5000
                  })
                  this.customers = this.customers.filter((el) => el.id != id);
                  this.updateDataSource();
                })
            }
          }
        )
  }

  retrieveRepescs() {
    this.repescService.getAllRepescs()
      .subscribe(el => {
        this.repescs = el as any;
      });
  }

  public copyToClipboard(field: string, value?: string) {
    this.clipboard.copy(value!);
    this.openSnackBar(field);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private openSnackBar(field?: string) {
    this._snackBar.open(`${field} copiado!` , 'Entendi', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 6000
    });
  }

   onRowClicked(row: any) {
    row.repesc as Repescs;
    this.selectedData = row;
    console.log(row)
    this.avatarFirstLetter = { firstName: row.nome.substr(0, 1), lastName: row.nome.substr(1) };
   
  }

  public setPropertyStyle(): void {
    this.stylesServices.style([
      { style: '--row-colored', value: 'rgb(240, 221, 193, 1)', },
      { style: '--row-colored-deadline', value: 'rgb(247, 208, 223,1)', },
      { style: '--drawer-background-color', value: 'rgb(1, 149, 150,1)', },
      { style: '--drawer-avatar-background-color', value: 'rgb(1, 149, 150,1)', },
      { style: '--drawer-avatar-color', value: 'rgb(255, 255, 255, 1)', },
    ]);
  }
}