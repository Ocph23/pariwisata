import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dinas',
  templateUrl: './dinas.component.html',
  styleUrls: ['./dinas.component.scss']
})
export class DinasComponent implements OnInit {
page: any = {Title:'', contentTitle:'', contentBody: "ini Content"};
  constructor() {
    this.page.Title = 'DINAS PARIWISATA JAYAWIJAYA';

  }

  ngOnInit() {
   this.onClickProfile();
  }

  onClickProfile() {
    this.page.contentBody = "ini Profile";
    this.page.contentTitle="Profile";
  }

  
  onClickVisiMisi() {
    this.page.contentBody = "ini VISI DAN MISI";
    this.page.contentTitle="VISI DAN MISI";
  }

  
  onClickStruktur() {
    this.page.contentBody = "ini STRUKTUR ORGANISASI";
    this.page.contentTitle="STRUKTUR ORGANISASI";
  }

  
  onClickKontak() {
    this.page.contentBody = "ini Kontak";
    this.page.contentTitle="Kontak";
  }



}
