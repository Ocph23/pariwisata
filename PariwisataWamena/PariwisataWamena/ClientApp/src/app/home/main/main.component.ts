import { Component, OnInit, Input, Injectable} from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { ArticleService } from '../article.service';
import { DetailComponent } from '../detail/detail.component';
import { PanelArticle, ArticleType } from 'src/app/models/models.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss','../home.component.scss']
})


export class MainComponent implements OnInit{
  Kuliner: PanelArticle;
  Akomodasi: PanelArticle = { selected:null, datas:[] };
  Destinasi: PanelArticle = { selected: null, datas: [] };
  Datas: panelMain[] = [];
  constructor(public dataService: ArticleService, private router: Router) {
    this.dataService.getData(ArticleType.Destinasi).then(x => {
      if (x.datas.length > 0) {
        x.datas = x.datas.filter(x => x.status == 'publish');
        this.Datas.push({ PanelType: ArticleType.Destinasi, title: ArticleType.Destinasi.toLocaleUpperCase(), Data: x, color1: 'blue', color2: 'blue' });

        this.dataService.getData(ArticleType.Akomodasi).then(y => {
          if (y.datas.length > 0) {
            y.datas = y.datas.filter(t => t.status == 'publish');
            this.Datas.push({
              PanelType: ArticleType.Akomodasi, title: ArticleType.Akomodasi.toLocaleUpperCase(),
              Data: y, color1: 'green', color2: 'green'
            });


            this.dataService.getData(ArticleType.Kuliner).then(z => {
              if (z.datas.length > 0) {
                z.datas = z.datas.filter(x => x.status == 'publish');
                this.Datas.push({
                  PanelType: ArticleType.Kuliner, title: ArticleType.Kuliner.toLocaleUpperCase(),
                  Data: z, color1: 'orange', color2: 'orange'
                });
              }
            });
          }
        });
      }
    });
   }

  async ngOnInit() {
   
  }



};



@Component({
  selector: 'main-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./main.component.scss', '../home.component.scss']
})

export class MainPanelComponent implements OnInit {
  @Input() DataPanel: panelMain;
  constructor(private dataService: ArticleService, private router: Router) {
  }

  isActive:boolean;

  ngOnInit(): void {
    setTimeout(x => {
      this.isActive = this.isActive = true;
    }, 2000);
  }


  public onSelectArticle(data) {
    this.dataService.currentArticle = data;
    this.router.navigate(['/home/detail']);
  }
}
  

@Component({
  selector: 'berita-panel',
  templateUrl: './berita.component.html',
  styleUrls: ['./berita.component.scss']
})

export class BeritaPanelComponent implements OnInit {
  DataPanel: PanelArticle;
  constructor(private dataService: ArticleService, private router: Router) {
    this.dataService.getData(ArticleType.Akomodasi).then(x => {
      if (x.datas.length > 0) {
          x.datas = x.datas.filter(x => x.status == 'publish');
        this.DataPanel = { selected: dataService.GetRandomArticle(x.datas), datas: x.datas };
        setTimeout(x => {
          this.isActive = this.isActive = true;
        }, 2000);
      }
    });
  }

  isActive: boolean;

  ngOnInit(): void {
   
  }


  public onSelectArticle(data) {
    this.dataService.currentArticle = data;
    this.router.navigate(['/home/detail']);
  }

}


export interface panelMain {
  PanelType: ArticleType;
  Data: PanelArticle;
  title: string;
  color1: string;
  color2: string
}
