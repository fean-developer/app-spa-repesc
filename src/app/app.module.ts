import { FormaData } from 'src/app/_helpers/format.data';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RepescsService } from './services/repescs.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TradutorComponent } from './components/tradutor/tradutor.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppConfigModule } from './config/app-config';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CustomersComponent } from './components/customers/customers.component';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { DialogGenerateCustomersComponent } from './components/dialogs/dialog-generate-customers/dialog-generate-customers.component';
import { DataCustomerComponent } from './components/dialogs/data-customer/data-customer.component';
import { FormDataTradutorComponent } from './components/tradutor/form-data-tradutor/form-data-tradutor.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { AppRoutingModule } from './app-routing.module';
import { UploadTradutorComponent } from './components/dialogs/upload-tradutor/upload-tradutor.component';
import { DialogAlertComponent } from './components/dialogs/dialog-alert/dialog-alert.component';
import { CustomerUpdateComponent } from './components/dialogs/customer-update/customer-update.component';
import { SharedModule } from './common/shared/shared.module';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    TradutorComponent,
    LoginComponent,
    DashboardComponent,
    CustomersComponent,
    DialogGenerateCustomersComponent,
    DataCustomerComponent,
    FormDataTradutorComponent,
    UploadTradutorComponent,
    DialogAlertComponent,
    CustomerUpdateComponent
  ],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    AppConfigModule,
    LottieModule.forRoot({ player: playerFactory }),
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [RouterModule],
  providers: [RepescsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  FormaData],
  bootstrap: [AppComponent]
})
export class AppModule { }
