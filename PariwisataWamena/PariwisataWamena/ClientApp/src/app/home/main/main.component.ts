import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { from } from 'rxjs';
import { delay } from 'q';
import { DetailComponent } from '../detail/detail.component';
import { PanelArticle, ArticleType } from 'src/app/models/models.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  Kuliner: PanelArticle;
  Akomodasi: PanelArticle;
  Destinasi: PanelArticle;
  constructor(public dataService: ArticleService, private router: Router) {
    dataService.getData(ArticleType.Kuliner).then(x=>{
      this.Kuliner= x;
      });

      dataService.getData(ArticleType.Akomodasi).then(x=>{
        this.Akomodasi= x;
        });

        dataService.getData(ArticleType.Destinasi).then(x=>{
          this.Destinasi= x;
          });

   }

  async ngOnInit() {
  const result = await this.dataService.getData(ArticleType.Kuliner);
  }


  public onSelectArticle(data) {
    this.dataService.currentArticle = data;
    this.router.navigate(['/home/detail']);
  }

}
