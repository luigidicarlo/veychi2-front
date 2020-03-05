import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  manageUsers() {
  	this.router.navigate(['/admin-panel/usuarios']);
  }

  manageMarketing() {
  	this.router.navigate(['/admin-panel/categorias']);
  }

  manageComercial() {
  	this.router.navigate(['/admin-panel/solicitud-vendedores']);
  }

  manageSales() {
  	this.router.navigate(['/admin-panel/ventas']);
  }

}
