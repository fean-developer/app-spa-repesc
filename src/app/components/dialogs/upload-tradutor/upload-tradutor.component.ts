import { TradutorComponent } from './../../tradutor/tradutor.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { REPESC_TABLE_DICTIONARY } from './../constants/repesc-table.constants';

@Component({
  selector: 'app-upload-tradutor',
  templateUrl: './upload-tradutor.component.html',
  styleUrls: ['./upload-tradutor.component.scss']
})
export class UploadTradutorComponent implements OnInit {
  public dictionary: any = REPESC_TABLE_DICTIONARY;
  constructor(
    public dialogRef: MatDialogRef<TradutorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
