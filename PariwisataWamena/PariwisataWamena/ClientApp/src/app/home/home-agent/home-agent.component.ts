import { Component, OnInit } from '@angular/core';
import { AgentService } from '../article.service';
import { Router } from '@angular/router';
import { agent } from 'src/app/models/models.component';

@Component({
  selector: 'app-home-agent',
  templateUrl: './home-agent.component.html',
  styleUrls: ['./home-agent.component.scss']
})
export class HomeAgentComponent implements OnInit {
 
  source: agent[];
  Data: agent[];
  constructor(public agentService: AgentService, private router: Router) {
    



   }

  ngOnInit() {
    this.agentService.get().then(x => {
      this.source = x;
      this.Data = this.Data = this.source.copyWithin(this.source.length,1,this.source.length);
    });
  }


  // showDetail(data: article) {
  //   this.articleService.currentArticle = data;
  //   this.router.navigate(['/home/detail']);
  // }


  onSearchHandle($event) {
    if ($event) {
      this.Data = this.source.filter(x => x.name.includes($event) || x.profile.includes($event));
    } else {
      this.Data = this.source.copyWithin(this.source.length,1,this.source.length);
    }
  }


}
