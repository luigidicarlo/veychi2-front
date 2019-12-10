import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {
  selectedOption: string;
  printedOption: string = null;

  options = [
    { 
      name: "Porcentaje",
      value: 1 
    },
    { 
      name: "Cantidad",
      value: 2 
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.printedOption = this.selectedOption;
  }

}
