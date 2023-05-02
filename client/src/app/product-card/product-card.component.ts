import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() id: number;
  @Input() title: string;
  @Input() image: string;
  @Input() description: string;
  @Input() price: number;
  @Input() quantity: number;
  @Input() short_desc: string;
  @Input() category: string;
  @Input() onAdd: any;

  constructor() {}

  ngOnInit(): void {
    console.log("hello",this.id);
  }
}
