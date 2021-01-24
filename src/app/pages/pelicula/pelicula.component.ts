import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: [
  ]
})
export class PeliculaComponent implements OnInit {

  movie: MovieDetails;



  constructor(
    private route: ActivatedRoute,
    private peliculaSvc: PeliculasService,
    private location: Location
  ) { 

    const { id } = this.route.snapshot.params;
  
    this.peliculaSvc.getPelicula( id )
    .subscribe( res => this.movie = res )
  }

  ngOnInit(): void {
  }


  regresar(){
    this.location.back();
  }
}
