import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { ClientListComponent } from './pages/client-list/client-list.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzMessageModule} from 'ng-zorro-antd/message';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {AuthInterceptor} from './share/services/http-interceptors';
import {HttpService} from './share/services/httpService';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTableModule} from 'ng-zorro-antd/table';
import { MiddleComponent } from './pages/middle/middle.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { ClientEditComponent } from './pages/client-edit/client-edit.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientListComponent,
    NotFoundComponent,
    MiddleComponent,
    UserEditComponent,
    ClientEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzMenuModule,
    NzAvatarModule,
    NzDropDownModule,
    NzIconModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    // HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
