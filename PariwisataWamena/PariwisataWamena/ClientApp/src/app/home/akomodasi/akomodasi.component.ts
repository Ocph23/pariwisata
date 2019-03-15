import { Component, OnInit } from '@angular/core';
import { PanelArticle } from 'src/app/models/models.component';

@Component({
  selector: 'app-akomodasi',
  templateUrl: './akomodasi.component.html',
  styleUrls: ['./akomodasi.component.css']
})
export class AkomodasiComponent implements OnInit {
public Akomodasi:PanelArticle;
  constructor() { }

  ngOnInit() {
  }

}
