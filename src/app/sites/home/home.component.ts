import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { URIS_CONFIG } from 'src/app/config/urls-api';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _MovieDBService: MovieDBService) { }
  @ViewChild('moviesList', { read: ElementRef }) public moviesList!: ElementRef<any>;

  public movies: any = [];
  public urlImg: string = URIS_CONFIG.URL_IMAGES;
  public firstMovie: string = "";
  public scrollMovies$ = fromEvent(window, 'scroll', { capture: true });

  public movieSelected = {};

  public page = {
    page: 0,
    totalPages: 1
  }

  ngOnInit(): void {

    if (!this._MovieDBService.getStorageData('session_id')) {
      this.generateToken();
    }


    if (this._MovieDBService.getMovieLocalStorage()) {
      this.movies = this._MovieDBService.getMovieLocalStorage();
      this.firstMovie = this.movies.at(0).backdrop_path;
      this.movieSelected = this.movies.at(0);
    } else {
      this.getMovies();
    }

    const scrollMovement = this.scrollMovies$.pipe(
      map(this.calculateScroll));

    scrollMovement.subscribe(av => {
      if ((av) >= 99) {
        this.moreMovies();
      }
    });
  }

  private moreMovies() {
    this.getMovies();
  }

  public calculateScroll(e: any) {
    const { scrollWidth, scrollLeft, clientWidth } = e.target;
    return (scrollLeft / (scrollWidth - clientWidth)) * 100;
  }

  public getMovies() {
    this.page.page++;
    this._MovieDBService.getMovies(this.page.page).subscribe((results: any) => {
      this.movies = [...this.movies, ...results.results];
      this._MovieDBService.setMovieLocalStorage(this.movies);
      this._MovieDBService.setPageActual(this.page.page);
      this.page.page == 1 ? this.firstMovie = this.movies.at(0).backdrop_path : "";
      this.movieSelected = this.movies.at(0);
      this.page.totalPages = results.total_pages;
    });
  }

  public setBackground(img: string, data: any) {
    this.firstMovie = img;
    this.movieSelected = data;
  }

  public generateToken() {
    this._MovieDBService.generateToken().subscribe((tkn: any) => {
      localStorage.setItem('token', JSON.stringify(tkn));
      this.startSession(tkn);
      window.open(`https://www.themoviedb.org/authenticate/${tkn.request_token}`);
    });
  }

  private startSession(token: any) {

    setTimeout(() => {
      this._MovieDBService.createSession(token).subscribe(session => {
        localStorage.setItem('session_id', JSON.stringify(session));
        this.createMovieList();
      });
    }, 10000);
  }

  private createMovieList() {
    if (localStorage.getItem('list_id') === null) {
      this._MovieDBService.createMovieList().subscribe(
        (resp: any) => {
          localStorage.setItem('list_id', resp.list_id)
        }
      );
    }
  }

  public moveRight() {
    this.moviesList.nativeElement.scrollLeft += 200;
  }

  public moveLeft() {
    this.moviesList.nativeElement.scrollLeft -= 200;
  }

  public setMovieToList(id: number, index: number) {
    this._MovieDBService.addMovieToList(id).subscribe(
      (resp: any) => {
        this.movies[index]['favorite'] = true;
        this._MovieDBService.setMovieLocalStorage(this.movies);

      }, (err) => {
        console.error('error', err);
      }
    )
  }

  public removeMovieInList(id: number, index: number) {

    this._MovieDBService.removeMovieInList(id).subscribe(
      (resp: any) => {
        this.movies[index]['favorite'] = false;
        this._MovieDBService.setMovieLocalStorage(this.movies);

      }, (err) => {
        console.error('error', err);
      }
    )

  }
}
