import { Customers } from './../../models/customers';
import { CustomersService } from './../../services/customers.service';
import { DialogGenerateCustomersComponent } from './../dialogs/dialog-generate-customers/dialog-generate-customers.component';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent {

  customer!: Customers;
  onCustomer !: Customers;

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    public dialog: MatDialog) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  openDialog(event: MouseEvent, byRepesc?: boolean): void {
    const dialogRef = this.dialog.open(DialogGenerateCustomersComponent, {
      panelClass: 'modal-container'
    });
    this._bottomSheetRef.dismiss();

    if (byRepesc) dialogRef.componentInstance.byRepesc = true;
    event.preventDefault();

  }
}
