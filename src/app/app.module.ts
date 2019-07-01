import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Components 
import { AppComponent } from './app.component';
import { NewCustomerComponent } from './customer/new-customer/new-customer.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDateComponent } from './customer-date/customer-date.component';
import { ProfileCustomerComponent } from './customer/profile-customer/profile-customer.component';
import { MeasureCustomerComponent } from './customer/measure-customer/measure-customer.component';
import { NewMeasureComponent } from './customer/measure-customer/new-measure/new-measure.component';


//Services
import { CustomerService } from './services/customer.service';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from './services/message.service';
import { MeasureService } from './services/measure.service';


//Ngprime
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {ToolbarModule} from 'primeng/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import { LoginComponent } from './login/login.component';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomerComponent,
    CustomerDateComponent,
    NewCustomerComponent,
    ProfileCustomerComponent,
    MeasureCustomerComponent,
    NewMeasureComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    FormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    ToolbarModule,
    SplitButtonModule,
    TableModule,
    ButtonModule,
    SidebarModule,
    DialogModule,
    CalendarModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    PanelModule,
    TabViewModule,
    ReactiveFormsModule
  ],
  providers: [CustomerService, MeasureService, ConfirmationService,
     MessageService, MessageService, AuthGuardService, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
