import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SystemPageComponent } from './system-page/system-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { BookmarkPageComponent } from './bookmark-page/bookmark-page.component';
import { AddProgramPageComponent } from './add-program-page/add-program-page.component';
import { ProgramSpecPageComponent } from './program-spec-page/program-spec-page.component';
import { SystemAnalystPageComponent } from './system-analyst-page/system-analyst-page.component';
import { AddUiSpecPageComponent } from './add-ui-spec-page/add-ui-spec-page.component';
import { AddServiceSpecPageComponent } from './add-service-spec-page/add-service-spec-page.component';
import { AddProgramStepComponent } from './add-program-step/add-program-step.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'account', children: [
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'profile', component: ProfilePageComponent },
    { path: 'edit', component: ProfilePageComponent },
    { path: 'bookmark', component: BookmarkPageComponent },
  ] },
  { path: 'home', component: HomePageComponent },
  { path: 'project', component: ProjectPageComponent },
  { path: 'system', component: SystemPageComponent },
  { path: 'system-analyst', component: SystemAnalystPageComponent },
  { path: 'programspec/:id', component: ProgramSpecPageComponent },
  { path: 'create/spec', component: AddProgramStepComponent, children: [
    { path: 'program', component: AddProgramPageComponent },
    { path: 'component', component: AddUiSpecPageComponent },
    { path: 'service', component: AddServiceSpecPageComponent },
  ] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
