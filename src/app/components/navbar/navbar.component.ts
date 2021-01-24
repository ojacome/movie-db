import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }



  buscarPelicula( termino: string ){

    termino = termino.trim();

    if( termino.length < 2){ return }

    this.router.navigate(['/buscar', termino])    
  }
}
