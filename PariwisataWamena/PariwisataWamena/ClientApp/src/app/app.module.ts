import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { KulinerComponent } from './kuliner/kuliner.component';
import { DestinasiComponent } from './destinasi/destinasi.component';
import { AkomodasiComponent } from './akomodasi/akomodasi.component';
import { DinasComponent } from './dinas/dinas.component';
import { AgentComponent } from './agent/agent.component';
import { AdminComponent } from './admin/admin.component';
import { from } from 'rxjs';
import { LoginComponent } from './admin/login/login.component';
import { AuthService } from './admin/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    KulinerComponent,
    DestinasiComponent,
    AkomodasiComponent,
    DinasComponent,
    AgentComponent,
    AdminComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {path: 'kuliner', component: KulinerComponent},
      {path: 'akomodasi', component: AkomodasiComponent},
      {path: 'dinas', component: DinasComponent},
      {path: 'destinasi', component: DestinasiComponent},
      {path: 'agen', component: AgentComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'login', component: LoginComponent},
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
