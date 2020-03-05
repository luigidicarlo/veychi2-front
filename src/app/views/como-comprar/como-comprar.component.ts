import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-como-comprar',
  templateUrl: './como-comprar.component.html',
  styleUrls: ['./como-comprar.component.css']
})
export class ComoComprarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  generatePdf(){
    const documentDefinition = { content: 'This is for testing.' };
    pdfMake.createPdf(documentDefinition).open();
  }

}
