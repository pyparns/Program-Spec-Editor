import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
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
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
import { ProgramSpecPageComponent } from './program-spec-page/program-spec-page.component';

import { SafePipe } from './pipe/safe.pipe';
import { AccountService } from './service/account.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { SystemPageComponent } from './system-page/system-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { BookmarkPageComponent } from './bookmark-page/bookmark-page.component';
import { SystemAnalystPageComponent } from './system-analyst-page/system-analyst-page.component';
import { ProgramSpecVersionComponent } from './program-spec-version/program-spec-version.component';
import { AddUiSpecPageComponent } from './add-ui-spec-page/add-ui-spec-page.component';
import { AddServiceSpecPageComponent } from './add-service-spec-page/add-service-spec-page.component';
import { AddProgramStepComponent } from './add-program-step/add-program-step.component';
import { ServiceSpecComponent } from './service-spec/service-spec.component';
import { ComponentSpecComponent } from './component-spec/component-spec.component';

@NgModule({
  declarations: [
    SafePipe,
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    LoginPageComponent,
    SystemPageComponent,
    ProfilePageComponent,
    ProjectPageComponent,
    BookmarkPageComponent,
    PageNotFoundComponent,
    RegisterPageComponent,
    AddProgramPageComponent,
    ProgramSpecPageComponent,
    SystemAnalystPageComponent,
    ProgramSpecVersionComponent,
    AddUiSpecPageComponent,
    AddServiceSpecPageComponent,
    AddProgramStepComponent,
    ServiceSpecComponent,
    ComponentSpecComponent,
  ],
  imports: [
    TagModule,
    CardModule,
    PanelModule,
    FormsModule,
    ToastModule,
    TableModule,
    StepsModule,
    ImageModule,
    ButtonModule,
    DialogModule,
    EditorModule,
    BrowserModule,
    MessageModule,
    MenubarModule,
    TabViewModule,
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
    ScrollPanelModule,
    RadioButtonModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
