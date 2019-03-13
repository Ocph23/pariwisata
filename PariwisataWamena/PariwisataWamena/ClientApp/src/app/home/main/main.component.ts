import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { from } from 'rxjs';
import { delay } from 'q';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public dataService: ArticleService, private router: Router) {
    dataService.get();

   }

  async ngOnInit() {
await delay(3000);
  }


  public onSelectArticle(data) {
    this.dataService.currentArticle = data;
    this.router.navigate(['/home/detail']);
  }

}
