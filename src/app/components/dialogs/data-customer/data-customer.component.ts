import { Customers } from 'src/app/models/customers';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'data-dialog-generated',
  templateUrl: './data-customer.component.html',
  styleUrls: ['./data-customer.component.scss']
})
export class DataCustomerComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Input() public customer!: Customers;
  constructor(
    private clipboard: Clipboard,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  public copyToClipboard(value?: string) {
    this.clipboard.copy(value!);
    this.openSnackBar();
  }

  private openSnackBar() {
    this._snackBar.open('Documento copiado', 'Entendi', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 6000
    });
  }
}
