import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ArticleParameter, ArticleType } from '../admin-add-article/admin-add-article.component';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-admin-akomodasi',
  templateUrl: './admin-akomodasi.component.html',
  styleUrls: ['../admin.component.scss', './admin-akomodasi.component.scss']
})


export class AdminAkomodasiComponent implements OnInit {
private data: ArticleParameter;
  constructor(private router: Router) { }

  ngOnInit() {
 
  }



  goTo (){
   
    const data ={'Type':'Akomodasi', 'Title':'', 'Content':'Siapa'};
    this.router.navigate(['/admin/article',data]);
  }
}
