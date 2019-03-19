import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './home/nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { KulinerComponent } from './home/kuliner/kuliner.component';
import { DestinasiComponent } from './home/destinasi/destinasi.component';
import { AkomodasiComponent } from './home/akomodasi/akomodasi.component';
import { DinasComponent } from './home/dinas/dinas.component';
import { AdminComponent } from './admin/admin.component';
import { from } from 'rxjs';
import { LoginComponent } from './authentification/login/login.component';
import { AuthService } from './authentification/auth.service';
import { AuthentificationComponent } from './authentification/authentification.component';
import { MainComponent } from './home/main/main.component';
import { AdminDinasComponent } from './admin/admin-dinas/admin-dinas.component';
import { AdminKulinerComponent } from './admin/admin-kuliner/admin-kuliner.component';
import { AdminAkomodasiComponent } from './admin/admin-akomodasi/admin-akomodasi.component';
import { AdminAgentComponent } from './admin/admin-agent/admin-agent.component';
import { AdminDestinasiComponent } from './admin/admin-destinasi/admin-destinasi.component';
import { AdminAddArticleComponent } from './admin/admin-add-article/admin-add-article.component';
import { DetailComponent } from './home/detail/detail.component';
import { ModelsComponent } from './models/models.component';
import { SearchComponent } from './search/search.component';
import { FilterPipe } from './filter.pipe';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AgentHomeComponent } from './home/agent-home/agent-home.component';
import { AgentComponent } from './agent/agent.component';
import { LayananComponent } from './agent/layanan/layanan.component';
import { TransaksiComponent } from './agent/transaksi/transaksi.component';
import { ContactComponent } from './agent/contact/contact.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AlertConfigComponent } from './alert-config/alert-config.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    KulinerComponent,
    DestinasiComponent,
    AkomodasiComponent,
    DinasComponent,
    AdminComponent,
    LoginComponent,
    AuthentificationComponent,
    MainComponent,
    AdminDinasComponent,
    AdminKulinerComponent,
    AdminAkomodasiComponent,
    AdminAgentComponent,
    AdminDestinasiComponent,
    AdminAddArticleComponent,
    AgentComponent,
    DetailComponent,
    ModelsComponent,
    SearchComponent,
    FilterPipe, AgentHomeComponent,
    LayananComponent, TransaksiComponent,
    ContactComponent,
    AlertConfigComponent
  ],
  imports: [
    ReactiveFormsModule , SweetAlert2Module.forRoot(),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule, AngularEditorModule,
    FormsModule, NgbModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home/main', pathMatch: 'full' },
      { path: 'home', redirectTo: 'home/main' },
      { path: 'user', redirectTo: 'user/login' },
      {
        path: 'home', component: HomeComponent, children: [
          { path: 'main', component: MainComponent },
          { path: 'kuliner', component: KulinerComponent },
          { path: 'akomodasi', component: AkomodasiComponent },
          { path: 'dinas', component: DinasComponent },
          { path: 'destinasi', component: DestinasiComponent },
          { path: 'agen', component: AgentHomeComponent },
          { path: 'detail', component: DetailComponent, data: null },
        ]
      },
      {
        path: 'admin', component: AdminComponent, children: [
          { path: 'dinas', component: AdminDinasComponent },
          { path: 'kuliner', component: AdminKulinerComponent },
          { path: 'akomodasi', component: AdminAkomodasiComponent },
          { path: 'agent', component: AdminAgentComponent },
          { path: 'destinasi', component: AdminDestinasiComponent },
          { path: 'article', component: AdminAddArticleComponent, data: null },

        ]
      },
      {
        path: 'agent', component: AgentComponent, children: [
        ]
      },
      {
        path: 'user', component: AuthentificationComponent, children: [
          { path: 'login', component: LoginComponent },
        ]
      }
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
