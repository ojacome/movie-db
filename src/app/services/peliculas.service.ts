import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MovieDetails } from '../interfaces/movie-response';
import { CreditsResponse } from '../interfaces/credits-response';
const base_url = 'https://api.themoviedb.org/3';
const key = environment.MOVIE_API_KEY;

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private carteleraPage = 1;
  public cargando = false;

  constructor(
    private http: HttpClient
  ) { }

  get params() {
    return {
      api_key: key,
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }


  getCartelera(): Observable<Movie[]> {

    if( this.cargando){
      return of([])
    }

    console.info('peticon api');
    this.cargando = true;
    let url = `${base_url}/movie/now_playing`;
    return this.http.get<CarteleraResponse>(url, { params: this.params })
    .pipe( 
      map( res => res.results),
      tap( () =>{
        this.carteleraPage += 1;
        this.cargando = false;
      } )
    )
  }

  buscar( query : string) {
    let url = `${base_url}/search/movie`;
    const params = { ...this.params, page: '1', query };
    return this.http.get<CarteleraResponse>(url, { params} )
    .pipe( 
      map( res => res.results)
    )
  }

  resetPage(){
    this.carteleraPage = 1;
  }

  getPelicula( id: string ){
    let url = `${base_url}/movie/${id}`;

    return this.http.get<MovieDetails>( url, { params: this.params })  
    .pipe(
      catchError( err => of(null) )
    )  
  }

  getCats( id: string ){
    let url = `${base_url}/movie/${id}/credits`;

    return this.http.get<CreditsResponse>( url, { params: this.params })   
    .pipe( 
      map( res => res.cast ), 
      catchError( err => of([]) )      
    )
  }
}
