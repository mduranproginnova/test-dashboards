import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {

  public params: any[] = [];
  public selectCustumer: string[];
  private vari: string;

  constructor() { }

  ngOnInit(): void {
    this.selectCustumer = [];
  }

  ngOnChanges() {
  }

  public onChangeSelect(value) {
    this.selectCustumer = [];
    this.selectCustumer.push(value);
  }

  private fun() {
    console.log("do something");
  }
}
