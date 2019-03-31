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




export interface IModalResult {
  success: boolean;
  data: any;
}


export interface PanelArticle {
  datas: article[];
  selected: article;
}

export interface article {
    desc: string;
  idarticle: number;
  title: string;
  content: string;
  draft: string;
  type: string;
  createdate: Date | string;
  thumb: string;
  iduser: number;
  status: string;
  user: user;
}

export enum ArticleType {
  Kuliner = 'Kuliner',
  Akomodasi = 'Akomodasi',
  Destinasi = 'Destinasi',
  Dinas = 'Dinas',
  Berita = 'Berita'
}


export interface user {
  iduser: number;
  username: string;
  password: string;
  avatar: string;
  token: string;
  roles: role[];
  PasswordHash: string;
  PasswordSalt: string;
}

export interface role {
  idrole: number;
  name: string;
}



export interface agent {

  idagent: number;

  name: string;


  email: string;


  address: string;

  contactName: string;

  telepon: string;

  profile: string;

  userid: number;

  Layanans: layanan[];

  Transactions: transaction[];
}

export interface layanan {
  idservice: number;

  name: string;

  content: string;

  idagent: number;


  price: number;



  active: boolean;

}



export interface transaction {
  tourist: touris;

  idtransaction: number;

  idservice: number;

  idtouris: number;

  count: number;

  start: Date | string;

  end: Date | string;

  payment: string;

}

export interface touris {
  idtouris: number;

  name: string;

  email: string;

  gender: string;

  address: string;

  telepon: string;

  iduser: number;

}
