import { Component, OnInit, Inject, Input, SimpleChange } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleType } from 'src/app/models/models.component';

@Component({
  selector: 'app-kuliner',
  templateUrl: './kuliner.component.html',
  styleUrls: ['./kuliner.component.css']
})



export class KulinerComponent implements OnInit {
  public Kuliners: Article[];
  searchText: string;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Article[]>(baseUrl + 'api/Kuliner/Kuliners').subscribe(result => {
      this.Kuliners = result;
      const data = this.Kuliners[0];
      console.log(data.title);
    }, error => console.error(error));
  }
  ngOnInit() {
  }

  onReciviedSearch(searchtext: string){
    this.searchText=searchtext;
      }

}

interface Article {
  title: string;
  categories: any;
  content: string;
  foto: string;
}
