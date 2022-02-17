import { SetContext } from './../../_helpers/context-data';
import Context from 'src/app/_helpers/context-data';
import { UserService } from './../../services/user.service';
import { Customers } from 'src/app/models/customers';
import { DialogGenerateCustomersComponent } from './../dialogs/dialog-generate-customers/dialog-generate-customers.component';
import { FormaData } from 'src/app/_helpers/format.data';
import { DialogAlertComponent } from './../dialogs/dialog-alert/dialog-alert.component';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StylesService } from 'src/app/services/styles.service';
import { CustomersService } from './../../services/customers.service';
import { Component, ViewChild, OnInit, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { finalize, delay } from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
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
export class CustomersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  @ViewChild(Customers) selectedData!: Customers;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  displayedColumns: string[] = ['nome'];
  public dataSource!: MatTableDataSource<Customers>;
  public customers: Customers[] = [];
  public repescs!: SetContext<Repescs[]>;
  public dataCustomers!: SetContext<Customers[]>;
  public shared: boolean = false;

  public avatarFirstLetter!: { firstName: string, lastName: string }
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  public isLoading: boolean = false;
  public hasData: boolean = false;
  public dialogRef!: MatDialogRef<any>;
  public dialogGenerateRef!: MatDialogRef<any>;

  options: AnimationOptions = {
    path: 'assets/images/lottie/add-contact.json',
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
    private fomatData: FormaData,
    private usersServices: UserService,
    private _context: Context<Repescs[]>,
    private changed: ChangeDetectorRef
  ) { 
  }


  ngAfterViewInit(): void {
    setTimeout(() => this.updateDataSource(), 800)
  }
  
  
  ngOnInit(): void {
    if ( this._context.getContext()?.repescs ) {
      this.repescs = this._context.getContext()?.repescs;
    } else {
      this.retrieveRepescs();
    }
    if ( this._context.getContext()?.customers ) {
      this.customers = this._context.getContext()?.customers as Customers[];
    } else {
      this.listCustomers();
    }
  }

  openDialog() {
    this.dialogRef = this.dialog.open(DialogAlertComponent,{disableClose:true, data: { item : `<br /><br />CPF:  ${ this.fomatData.formatCpf(this.selectedData?.cpf)} <br /> ${this.selectedData?.nome}`}});
  }

  openGenerateDialog(event: MouseEvent, byRepesc?: boolean, byForm?: boolean): void {
    const dialogRef = this.dialog.open(DialogGenerateCustomersComponent, {
      panelClass: 'modal-container',
      data: {
        list: this.repescs
      }
    });

    if (byRepesc) dialogRef.componentInstance.byRepesc = true;
    if (byForm && !byRepesc) dialogRef.componentInstance.byForm = true;
    
    dialogRef.afterClosed().subscribe(
      () => {
        this.customers.push(dialogRef.componentInstance.customer);
        this._context.setContext({customers: this.customers})

        dialogRef.componentInstance.byForm = false;
        dialogRef.componentInstance.byRepesc = false;
        this.isLoading = false
        this.hasData = this.customers.length > 0 ? true : false;
        this.changed.detectChanges();
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
    try {
      this.service.getAllCustomers()
        .subscribe(data => {
          this.customers = data;
          this.customers.find((row) => {
            row.repescData = this.repescs.find((el: { code: string | undefined; }) => el.code == row.repesc)
          });
          this._context.setContext({customers: this.customers});
          this.isLoading = false
          this.hasData = this.customers.length > 0 ? true : false;
        });
        
      } catch (error) {
        this._snackBar.open('Erro ao gerar os dados','', {
          panelClass: 'error', 
          duration: 5000
        });
      }
    }
    
    updateDataSource() {
      this.dataSource = new MatTableDataSource<Customers>(this.customers);
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
                  console.log(this.customers)
                  this.updateDataSource();
                  this.changed.detectChanges();
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