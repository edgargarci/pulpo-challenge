import { Component, OnInit } from '@angular/core';
import { URIS_CONFIG } from 'src/app/config/urls-api';
import { FavoriteMovieList, ItemMovie } from 'src/app/shared/interfaces/favorite-movie-list';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-my-movies-list',
  templateUrl: './my-movies-list.component.html',
  styleUrls: ['./my-movies-list.component.scss']
})
export class MyMoviesListComponent implements OnInit {

  constructor(private _MovieDBService: MovieDBService) { }
  public favoriteList: ItemMovie[] = [];
  public urlImg: string = URIS_CONFIG.URL_IMAGES;

  ngOnInit(): void {
    this._MovieDBService.getFavoritesList().subscribe(
      (resp: FavoriteMovieList) => {
        this.favoriteList = resp.items
      });
  }
}
