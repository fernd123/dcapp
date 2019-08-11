import { CalendarHeaderComponent } from './date/calendar-header.component';
import { JwtModule } from '@auth0/angular-jwt';
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
import { FooterComponent } from './shared/components/footer/footer.component';


//Services
import { CustomerService } from './services/customer.service';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from './services/message.service';
import { MeasureService } from './services/measure.service';
import { CustomerDateService } from './services/customerdate.service';
import {DropdownModule} from 'primeng/dropdown';



//Ngprime
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {ToolbarModule} from 'primeng/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import { LoginComponent } from './login/login.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AgePipe } from './age.pipe';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DateComponent } from './date/date.component';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
registerLocaleData(localePy, 'es');

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
    LoginComponent,
    FooterComponent,
    AgePipe,
    DateComponent, CalendarHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    ToolbarModule,
    SplitButtonModule,
    TableModule,
    ButtonModule,
    SidebarModule,
    DropdownModule,
    DialogModule,
    ProgressSpinnerModule,
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
     CustomerDateService, NgbActiveModal,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
