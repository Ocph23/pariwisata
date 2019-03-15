import { Component, OnInit } from '@angular/core';
import { PanelArticle } from 'src/app/models/models.component';

@Component({
  selector: 'app-destinasi',
  templateUrl: './destinasi.component.html',
  styleUrls: ['./destinasi.component.css']
})
export class DestinasiComponent implements OnInit {

  public Destinasi:PanelArticle;
  constructor() { }

  ngOnInit() {
  }

}
