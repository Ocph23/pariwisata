import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchText: string;
  @Output() searchEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }


  onSearch(){
    this.searchEvent.emit(this.searchText);
  }
}
