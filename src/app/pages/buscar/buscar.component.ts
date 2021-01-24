import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  movies: Movie[] = [];
  cargando: boolean;
  texto: string;

  constructor(
    private route: ActivatedRoute,
    private peliculaSvc: PeliculasService
  ) { }

  ngOnInit(): void {
    this.cargando = true; 
    this.route.params.subscribe( ({texto}) =>{
      this.texto  = texto;
      this.peliculaSvc.buscar(texto)
      .subscribe( res => {
        this.movies = res;
        this.cargando = false;
      } )
    })
  }

}
