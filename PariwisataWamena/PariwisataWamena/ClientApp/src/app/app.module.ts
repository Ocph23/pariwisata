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
import { LoginComponent } from './authentification/login/login.component';
import { AuthService } from './authentification/auth.service';
import { AuthentificationComponent } from './authentification/authentification.component';
import { MainComponent, MainPanelComponent, BeritaPanelComponent } from './home/main/main.component';
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
import { AgentComponent } from './agent/agent.component';
import { LayananComponent } from './agent/layanan/layanan.component';
import { TransaksiComponent } from './agent/transaksi/transaksi.component';
import { AgentProfileComponent } from './agent/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ArticleService } from './home/article.service';
import { AgentAddServiceComponent } from './agent/agent-add-service/agent-add-service.component';
import { BeritaComponent } from './home/berita/berita.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { RegisterComponent } from './authentification/register/register.component';
import { HomeAgentComponent } from './home/home-agent/home-agent.component';


@NgModule({
  declarations: [
    AppComponent, NavMenuComponent, HomeComponent, BeritaPanelComponent,
    KulinerComponent, DestinasiComponent, AkomodasiComponent, DinasComponent, AdminComponent, LoginComponent,
    AuthentificationComponent, MainComponent, AdminDinasComponent, AdminKulinerComponent,
    AdminAkomodasiComponent, AdminAgentComponent, AdminDestinasiComponent, AdminAddArticleComponent,
    AgentComponent, DetailComponent, ModelsComponent, SearchComponent,
    FilterPipe, LayananComponent, TransaksiComponent, AgentProfileComponent, MainPanelComponent,
    AgentAddServiceComponent, BeritaComponent, RegisterComponent, HomeAgentComponent
  ],

  imports: [
    ReactiveFormsModule, SweetAlert2Module.forRoot(),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule, AngularEditorModule,
    FormsModule, NgbModule, FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home/main', pathMatch: 'full' },
      { path: 'home', redirectTo: 'home/main' },
      { path: 'user', redirectTo: 'user/login' },
      {
        path: 'home', component: HomeComponent, children: [
          { path: 'berita', component: BeritaComponent },
          { path: 'main', component: MainComponent },
          { path: 'kuliner', component: KulinerComponent },
          { path: 'akomodasi', component: AkomodasiComponent },
          { path: 'dinas', component: DinasComponent },
          { path: 'destinasi', component: DestinasiComponent },
          { path: 'agent', component: HomeAgentComponent },
          { path: 'detail', component: DetailComponent, data: null },
        ]
      },
      {
        path: 'admin', component: AdminComponent, children: [
          { path: 'berita', component: BeritaComponent },
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
          { path: 'layanan', component: LayananComponent },
          { path: 'transaksi', component: TransaksiComponent },
          { path: 'profile', component: AgentProfileComponent, data: null },
        ]
      },
      {
        path: 'user', component: AuthentificationComponent, children: [
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
        ]
      }
    ])
  ],
  providers: [AuthService, ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(fas, far);
  }
}
