import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})

export class ModelsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export interface PanelArticle {
  datas: article[];
  selected: article;
}

export interface article {
  idarticle: number;
  title: string;
  content: string;
  type: string;
  createdate: Date | string;
  thumb: string;
  iduser: number;
  tags: string[];
  status:string;
  draft:string;
  user: user;
}

export enum ArticleType {
  Kuliner = 'Kuliner',
  Akomodasi = 'Akomodasi',
  Destinasi = 'Destinasi',
  Dinas='Dinas'
}

export interface user {
  iduser: number;
  username: string;
  password: string;
  avatar: string;
  Token: string;
}

