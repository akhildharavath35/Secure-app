import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestoutpassComponent } from './requestoutpass/requestoutpass.component';
import { ViewoutpassComponent } from './viewoutpass/viewoutpass.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestformComponent } from './requestform/requestform.component';
import { ViewdataComponent } from './viewdata/viewdata.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { StudentsoutpassComponent } from './studentsoutpass/studentsoutpass.component';
import { SentComponent } from './sent/sent.component';
import { MinihomeComponent } from './minihome/minihome.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    RequestoutpassComponent,
    ViewoutpassComponent,
    ProfileComponent,
    RequestformComponent,
    ViewdataComponent,
    LoginComponent,
    HomeComponent,
    AdminhomeComponent,
    StudentsoutpassComponent,
    SentComponent,
    MinihomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
    ],
  providers: [AuthService , AuthGuard ,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
