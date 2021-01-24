import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  public moviesSlide: Movie[] = [];
  public movies: Movie[] = [];
  @HostListener('window:scroll', ['$event'])
  onScroll(){
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    let max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if( pos > max ){
      this.peliculaSvc.getCartelera()
      .subscribe( movies => this.movies.push( ...movies) )
    }
  }


  constructor(
    private peliculaSvc : PeliculasService
  ) { }


  ngOnDestroy(): void {
    this.peliculaSvc.resetPage();
  }

  ngOnInit(): void {

    this.peliculaSvc.getCartelera()
    .subscribe( movies => {
      this.movies = movies;
      this.moviesSlide = movies;
    } )
  }

}
