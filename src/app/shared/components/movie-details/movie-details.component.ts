import { Component, Input, OnInit } from '@angular/core';
import { URIS_CONFIG } from 'src/app/config/urls-api';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {



  public _movieData: any = true;
  public trillerUrl = URIS_CONFIG.TRILLER_URL;
  get movieData(): any {
    return this._movieData;
  }
  @Input() set movieData(value: any) {
    this._movieData = value;
    this.writeValues();
  }

  constructor() { }

  ngOnInit(): void {

  }

  public writeValues() {

  }

}
