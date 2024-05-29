import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShebaInquiry1';

  @Output() alerteCanicule = new EventEmitter<any>();

  ngOnInit(){
    this.title="Ayoub";
  }

  SeT(){
    this.title="SeT";
  }
}



