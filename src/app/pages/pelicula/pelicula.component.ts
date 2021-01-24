import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast } from 'src/app/interfaces/credits-response';
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
  cast : Cast[] = [];


  constructor(
    private route: ActivatedRoute,
    private peliculaSvc: PeliculasService,
    private location: Location,
    private router : Router
  ) { 

    const { id } = this.route.snapshot.params;
  
    this.peliculaSvc.getPelicula( id )
    .subscribe( res => {
      if( !res ){
        this.router.navigateByUrl('/');
        return;
      }

      this.movie = res      
    } )

    this.cargarCats(id);
  }

  ngOnInit(): void {
  }


  regresar(){
    this.location.back();
  }

  cargarCats(id : string){
    this.peliculaSvc.getCats( id)
    .subscribe( res => this.cast = res )
  }
}
