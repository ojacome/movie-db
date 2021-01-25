import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieDetails } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: [
  ]
})
export class PeliculaComponent {

  movie: MovieDetails;
  cast : Cast[] = [];


  constructor(
    private route: ActivatedRoute,
    private peliculaSvc: PeliculasService,
    private location: Location,
    private router : Router
  ) { 

    const { id } = this.route.snapshot.params;
  
    combineLatest([
      this.peliculaSvc.getPelicula( id ),
      this.peliculaSvc.getCats( id)
    ])
    .subscribe( ([movie, cast]) => {
      if( !movie ){
        this.router.navigateByUrl('/');
        return;
      }      
      this.movie = movie;
      this.cast = cast;
    })        
  }

  regresar(){
    this.location.back();
  }

}
