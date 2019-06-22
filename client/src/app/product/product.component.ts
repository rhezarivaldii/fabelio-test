import { Component, OnInit } from "@angular/core";
import { ProductService } from "./product.service";
import { Router } from "@angular/router";
import { DataService } from "app/services/data-service";
import { TranslateService } from "app/services/translate-service";
import { Subscription } from "rxjs";
import AOS from "aos";
import { Product } from "./product-details/product.model";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  public productList: Array<Product> = new Array<Product>();
  public product: Product = new Product();
  page: any = 0;
  size: any = 6;
  lang: String = "ID";
  private subscription: Subscription;

  constructor(
    public productService: ProductService,
    public router: Router,
    public dataService: DataService,
    public translateService: TranslateService
  ) {}

  ngOnInit() {
    this.productList = [];
    this.subscription = this.translateService.observableLang.subscribe(item => {
      this.lang = item;
    });

    this.productService.getAllRegisteredProducts().subscribe(
      result => {
        let image;
        result.forEach(product => {
          console.log(product);
          this.product = new Product();
          this.product.id = product.id;
          this.product.productName = product.productName;
          this.product.productDesc = product.productDesc;

          image = JSON.parse(product.productImg)[0].img;

          this.product.productImg = image;
          this.product.latestProductPrice = product.prices[0].productPrice;
          this.product.lastSynchronized = product.prices[0].createdAt;

          this.productList.push(this.product);
        });
        console.log(this.productList);
      },
      err => {
        console.log(err);
      }
    );

    AOS.init({
      duration: 800,
      disable: "mobile",
      once: true
    });
  }

  getDelay(index) {
    return index * 200;
  }

  public goToDetails(index) {
    let product = this.productList[index];
    this.dataService.product = product;
    this.router.navigate([
      "/product-details/" + product.id + "/" + product.productName
    ]);
  }

  getLanguage() {
    this.lang = this.translateService.lang;
  }
}
