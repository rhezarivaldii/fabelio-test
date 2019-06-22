import { Component, OnInit } from "@angular/core";
import { DataService } from "app/services/data-service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ProductDetails } from "./product-details.model";
import { Chart } from "chart.js";
import * as moment from "moment";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"]
})
export class ProductDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];

  private comment: String = "";
  private chart = [];
  public product: ProductDetails;
  public id: any;
  public jobVacancy = {
    title: "",
    description: ""
  };
  public mockJobVacancy = {
    title: "Mock Job",
    description: "Test Description",
    requirement: '<p><span style="font-style: italic">Test</span></p>'
  };
  public title: any;

  constructor(
    public dataService: DataService,
    public router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.title = this.route.snapshot.paramMap.get("title");
    this.product = new ProductDetails();

    this.productService.getProductById(this.id).subscribe(
      result => {
        this.product.id = result.id;
        this.product.productName = result.productName;
        this.product.productDesc = result.productDesc;
        this.product.productUrl = result.productUrl;
        this.product.prices = result.prices;
        this.product.comments = result.comments;

        let images: Array<Object> = new Array<Object>();
        JSON.parse(result.productImg).forEach(img => {
          images.push(img);
        });
        this.product.productImg = images;

        this.initGallery(images);

        console.log(this.product);
        this.initChart(this.product.prices);
      },
      err => {
        console.log(err);
      }
    );
  }

  public submitComment() {
    let req = {
      ProductId: this.id,
      comment: this.comment
    };

    this.productService.submitComment(req).subscribe(
      result => {
        this.comment = "";
        this.product.comments = result;
        console.log(result);
      },
      err => {
        console.log(err);
      }
    );
  }

  public upVote(comment) {
    this.productService.upVoteComment(comment.id).subscribe(
      result => {
        this.product.comments.forEach(currentComment => {
          if (currentComment == comment) {
            currentComment["votes"]["voteUp"] += 1;
          }
        });
        console.log(this.product);
      },
      err => {
        console.log(err);
      }
    );
  }

  public downVote(comment) {
    this.productService.downVoteComment(comment.id).subscribe(
      result => {
        comment.votes.voteDown += 1;
        console.log(this.product);
      },
      err => {
        console.log(err);
      }
    );
  }

  private initGallery(images) {
    this.galleryOptions = [
      {
        width: "100%",
        height: "400px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    images.forEach(image => {
      let body = {
        small: image.thumb,
        medium: image.img,
        big: image.full
      };

      this.galleryImages.push(body);
    });
  }

  private initChart(prices) {
    let time = [];
    let price = [];

    prices.reverse();

    prices.forEach(objPrice => {
      time.push(moment(objPrice.createdAt).format("LT"));
      price.push(parseInt(objPrice.productPrice.replace(/[^0-9]+/g, "")));
    });

    console.log(price);

    this.chart = new Chart("canvas", {
      type: "line",
      data: {
        labels: time,
        datasets: [
          {
            data: price,
            borderColor: "#3cba9f",
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: false,
          labels: {
            fontColor: "rgb(255, 99, 132)"
          }
        },
        scales: {
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            {
              display: true
            }
          ]
        }
      }
    });
  }
}
