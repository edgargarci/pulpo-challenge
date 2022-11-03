import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './sites/home/home.component';
import { MovieDetailsComponent } from './shared/components/movie-details/movie-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BarNavigationComponent } from './shared/components/bar-navigation/bar-navigation.component';
import { MyMoviesListComponent } from './sites/my-movies-list/my-movies-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieDetailsComponent,
    BarNavigationComponent,
    MyMoviesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    MovieDetailsComponent
  ]
})
export class AppModule { }
