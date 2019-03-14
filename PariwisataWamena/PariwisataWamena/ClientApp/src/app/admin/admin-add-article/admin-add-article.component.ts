import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { article } from 'src/app/models/models.component';

@Component({
  selector: 'app-admin-add-article',
  templateUrl: './admin-add-article.component.html',
  styleUrls: ['../admin.component.scss', './admin-add-article.component.scss']
})
export class AdminAddArticleComponent implements OnInit {
public Data: article;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    const sub = this.router.params.subscribe(params => {
     this.Data = params as article;
     console.log(this.Data);
      });
  }

}
