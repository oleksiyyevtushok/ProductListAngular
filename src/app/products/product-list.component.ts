import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => (this.errorMessage = <any>error),
    );
  }

  showImage: boolean = false;
  imgWidth: number = 50;
  imgMargin: number = 5;

  products: IProduct[];
  filteredProducts: IProduct[];
  pageTitle: string = 'Product List';
  _listFilter: string;
  errorMessage: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1,
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(msg: string): void {
    this.pageTitle = 'Product List' + msg;
  }
}
