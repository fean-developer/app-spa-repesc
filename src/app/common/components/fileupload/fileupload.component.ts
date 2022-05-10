import { Repescs } from 'src/app/models/repescs';
import { element } from 'protractor';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AppConfig, APP_CONFIG } from './../../../config/app-config';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducer';
import { updateRepescsAction } from 'src/app/store/actions';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent {


  @Input()
  public requiredFileType!: string;

  public fileName = '';
  public uploadProgress!: number;
  public uploadSub: Subscription = new Subscription();
  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private store$: Store<AppState>) 
 { }

  onFileSelected(event: any) {
    const file: File = event?.target?.files[0];
    try {

      if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append('thumbnail', file);

        const upload$ = this.http.post(`${this.config.api}/repescs/upload`, formData, {
          reportProgress: true,
          observe: 'events'
        })
          .pipe(
            delay(600),
            finalize(() => { this.reset(); this.openSnackBar('Arquivo carregado com sucesso', { panelClass: 'success' });
          this.dialog.closeAll(); })
          );

          
        this.uploadSub = upload$.subscribe(e => {
          const response = new HttpResponse(e as any)
          
          if (response.body) {
            this.store$.dispatch(updateRepescsAction.updateRepescs({repescs: response.body as Repescs[]}));
          }
         
          if (e.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (e.loaded / e.total!));
          }
        })
      }
    } catch (error: any) {
      this.openSnackBar(error.message)
    }
  }

  private openSnackBar(text: string, options?: MatSnackBarConfig<any>) {
    this._snackBar.open(text, 'Entendi', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 16000,
      ...options
    });
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub.unsubscribe();
  }
}