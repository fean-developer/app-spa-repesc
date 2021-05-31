import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RepescsService } from './services/repescs.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TradutorComponent } from './components/tradutor/tradutor.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppConfigModule } from './config/app-config';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CustomersComponent } from './components/customers/customers.component';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { DialogGenerateCustomersComponent } from './components/dialogs/dialog-generate-customers/dialog-generate-customers.component';
import { DataCustomerComponent } from './components/dialogs/data-customer/data-customer.component';
import { FormDataTradutorComponent } from './components/tradutor/form-data-tradutor/form-data-tradutor.component';



const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};
@NgModule({
  declarations: [
    AppComponent,
    TradutorComponent,
    LoginComponent,
    DashboardComponent,
    CustomersComponent,
    BottomSheetComponent,
    DialogGenerateCustomersComponent,
    DataCustomerComponent,
    FormDataTradutorComponent,
  ],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    AppConfigModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatDialogModule,
    ClipboardModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [RouterModule],
  providers: [RepescsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
