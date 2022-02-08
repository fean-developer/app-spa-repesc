import { CustomersService } from './../../../services/customers.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomersComponent } from './../../customers/customers.component';
import { Customers } from './../../../models/customers';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss']
})
export class CustomerUpdateComponent implements OnInit {
  @Input() customer!: Customers;
  selected!: User[];
  formCreate!: FormGroup;
  selectedId: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  allowShared: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<CustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private customerService: CustomersService,
    private _snackBar: MatSnackBar,
    ) { }

  

  ngOnInit(): void {
    this.selected = this.data.user;
  }


  public sharedWiUserForm() {
    this.formCreate = this.builder.group([
      {user: [this.selected.values]}
    ])
  }
  openSharedCustomer() {
    this.allowShared = !this.allowShared;
  }

  onSelectData($event:any) {
    this.selectedId = $event.target.value;
  }

  public sharedWithUser() {
    this.data.user.filter((item: { id: any; name: any; }) => {
      if( item.id == this.selectedId ) {
        const request = {
          id: this.data.customer.id,
          sharedWithUser:{
            id: item.id,
            name: item.name
          }
        };
        this.customerService.sharedWithUser(request)
        .subscribe(() => {
          const user = this.data.user.find((item: { id: any; }) => item.id == this.selectedId);
          this._snackBar.open(`Cliente ${this.data.customer.nome} compartilhado com o usuário  ${user.name} com sucesso!`,'',{
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: 'success',
            duration: 5000
          });
        })
        this.dialogRef.afterClosed()
        .subscribe(() => { 
          this.data.customer = {...this.data.customer,...{sharedWithUser:request.sharedWithUser}};
          this.dialogRef.componentInstance.customer = this.data.customer;
        })
      }
    })
  }
}
/**
 * this.data.user.filter((item: any) => item.id != this.data.customer.sharedWithUser.id)
 */