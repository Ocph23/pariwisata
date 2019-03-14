import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-kuliner',
  templateUrl: './admin-kuliner.component.html',
  styleUrls: ['../admin.component.scss', './admin-kuliner.component.scss']
})
export class AdminKulinerComponent implements OnInit {
  show: Boolean = false;

  toggleCollapse() {
    this.show = !this.show;
  }
  constructor() { }

  ngOnInit() {
  }


  public tests(){

  }

}
