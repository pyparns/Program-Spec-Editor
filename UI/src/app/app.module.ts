import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { TimelineModule } from 'primeng/timeline';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FileUploadModule } from 'primeng/fileupload';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditorModule } from 'primeng/editor';
import { StepsModule } from 'primeng/steps';
import { ScrollPanelModule } from 'primeng/scrollpanel';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddProgramPageComponent } from './add-program-page/add-program-page.component';
import { ImportSpecPageComponent } from './import-spec-page/import-spec-page.component';
import { ProgramSpecPageComponent } from './program-spec-page/program-spec-page.component';

import { SafePipe } from './pipe/safe.pipe';
import { UserEffects } from './state/user';
import { AccountService } from './service/account.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { reducers, metaReducers } from './reducers';
import { ProgramSpecVersionComponent } from './program-spec-version/program-spec-version.component';

@NgModule({
  declarations: [
    SafePipe,
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    LoginPageComponent,
    ProfilePageComponent,
    PageNotFoundComponent,
    RegisterPageComponent,
    AddProgramPageComponent,
    ImportSpecPageComponent,
    ProgramSpecPageComponent,
    ProgramSpecVersionComponent,
  ],
  imports: [
    EditorModule,
    StepsModule,
    ScrollPanelModule,
    TagModule,
    CardModule,
    PanelModule,
    FormsModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    BrowserModule,
    MessageModule,
    MenubarModule,
    SkeletonModule,
    TimelineModule,
    MessagesModule,
    DropdownModule,
    PasswordModule,
    CheckboxModule,
    DataViewModule,
    OrderListModule,
    InputTextModule,
    KeyFilterModule,
    PdfViewerModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule,
    TieredMenuModule,
    SplitButtonModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([UserEffects])
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
