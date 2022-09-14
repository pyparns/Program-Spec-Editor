import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FileUploadModule } from 'primeng/fileupload';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddProgramPageComponent } from './add-program-page/add-program-page.component';
import { ImportSpecPageComponent } from './import-spec-page/import-spec-page.component';
import { ProgramSpecPageComponent } from './program-spec-page/program-spec-page.component';

import { SafePipe } from './pipe/safe.pipe';

@NgModule({
  declarations: [
    SafePipe,
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    LoginPageComponent,
    PageNotFoundComponent,
    RegisterPageComponent,
    AddProgramPageComponent,
    ImportSpecPageComponent,
    ProgramSpecPageComponent,
  ],
  imports: [
    TagModule,
    FormsModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    BrowserModule,
    MessageModule,
    MenubarModule,
    MessagesModule,
    DropdownModule,
    PasswordModule,
    CheckboxModule,
    DataViewModule,
    OrderListModule,
    InputTextModule,
    KeyFilterModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
