import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URIS_CONFIG } from 'src/app/config/urls-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDBService {

  public readonly urlBase = URIS_CONFIG.BASE_URL_MOVIE;
  public readonly discover = URIS_CONFIG.DISCOVER_END_POINT;
  public readonly apiKey = URIS_CONFIG.API_KEY;
  public readonly apiKeyA = URIS_CONFIG.API_KEY_A;
  public readonly list = URIS_CONFIG.LIST_END_POINT;

  constructor(private http: HttpClient) { }

  public getMovies(page: number = 1, air_date: string = '2023-05-02'): Observable<any> {


    const filters = `
air_date.lte=${air_date}&
page=${page}&
sort_by=vote_average.desc&
vote_average.gte=0&
vote_average.lte=10&
vote_count.gte=300&
with_runtime.gte=0&
with_runtime.lte=400`

    return this.http.get(`${this.urlBase}${this.discover}?${this.apiKey}&${filters}`);

  }

  public setMovieLocalStorage(data: any) {
    localStorage.setItem('movie-list', JSON.stringify(data));
  }

  public getMovieLocalStorage() {
    const movieList: any = localStorage.getItem('movie-list');
    return JSON.parse(movieList);
  }

  public getStorageData(key: any) {
    return localStorage.getItem(key);
  }

  public setPageActual(page: number) {
    localStorage.setItem('actual-page', page.toString());
  }

  public generateToken(): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/authentication/token/new?${this.apiKey}`);

  }

  public createSession(token: any) {
    return this.http.get(`https://api.themoviedb.org/3/authentication/session/new?${this.apiKey}&
request_token=${token.request_token}`);
  }

  public createMovieList(): Observable<any> {
    const jsonSesion: any = localStorage.getItem('session_id');

    const { session_id } = JSON.parse(jsonSesion);

    const body = {
      "name": "lista de pelis",
      "description": "mis mejores peliculas",
      "language": "es"
    }
    const headers = { 'content-type': 'application/json;charset=utf-8' }

    return this.http.post(`${this.urlBase}${this.list}?${this.apiKey}&
session_id=${session_id}`, body, { 'headers': headers });
  }

  public addMovieToList(id: number) {
    const jsonSesion: any = localStorage.getItem('session_id');
    const { session_id } = JSON.parse(jsonSesion);
    const headers = { 'content-type': 'application/json;charset=utf-8' }

    const list_id = localStorage.getItem('list_id');
    const body = {
      media_id: id
    }

    return this.http.post(`${this.urlBase}${this.list}/${list_id}/add_item?${this.apiKey}&
session_id=${session_id}`, body, { 'headers': headers });
  }


  public removeMovieInList(id: number) {

    const jsonSesion: any = localStorage.getItem('session_id');
    const { session_id } = JSON.parse(jsonSesion);
    const headers = { 'content-type': 'application/json;charset=utf-8' }

    const list_id = localStorage.getItem('list_id');
    const body = {
      media_id: id
    }

    return this.http.post(`${this.urlBase}${this.list}/${list_id}/remove_item?${this.apiKey}&
session_id=${session_id}`, body, { 'headers': headers });
  }

  public getFavoritesList(): Observable<any> {
    const listId = localStorage.getItem('list_id');

    return this.http.get(`${this.urlBase}${this.list}/${listId}?${this.apiKey}`)

  }

}
