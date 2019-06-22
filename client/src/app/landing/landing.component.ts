import {
  Component,
  OnInit,
  ElementRef
} from "@angular/core";
import { Router } from "@angular/router";
import AOS from "aos";
import { TranslateService } from "app/services/translate-service";
import { Subscription, Subscriber } from "rxjs";
import { NavbarService } from "app/shared/navbar/navbar.service";
import { Request } from "./landing.model";
import { LandingService } from "./landing.service";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  times = 2000;
  counter = 0;
  state = "down";
  stateComponent = "hide";
  bounce: any;
  lang = "in";
  private subscription: Subscription;
  trackImage = "assets/img/LACAK-PARSEL.png";
  subscriber: Subscriber<any>;

  name: String = "";
  fabelioUrl: String = "";

  private nameErrorMessage = "Nama tidak boleh kosong";
  private emailErrorMessage = "Email tidak boleh kosong";
  private subscribeMessage = "Terima kasih telah berlangganan Titipaja Newsletter!"

  constructor(
    public router: Router,
    public el: ElementRef,
    public translateService: TranslateService,
    private navbarService: NavbarService,
    private landingService: LandingService,
    private spinner: NgxSpinnerService,
    private snackbar: MatSnackBar
  ) {
    this.navbarService.navState$.subscribe(state => {
      this.scroll(state);
    });
  }

  ngOnInit() {
    this.subscriber = new Subscriber();

    AOS.init({
      duration: 800,
      disable: "mobile",
      once: true
    });

    this.subscription = this.translateService.observableLang.subscribe(item => {
      this.lang = item;

      this.initErrorMessageSubscribe();
    });
  }

  initErrorMessageSubscribe() {
    if (this.lang == 'in') {
      this.nameErrorMessage = "Nama tidak boleh kosong";
      this.emailErrorMessage = "Email tidak boleh kosong";
      this.subscribeMessage = "Terima kasih telah berlangganan Titipaja Newsletter!"
    } else {
      this.nameErrorMessage = "Name can not be empty";
      this.emailErrorMessage = "Email can not be empty";
      this.subscribeMessage = "Thank you for subscribing Titipaja's Newsletter!";
    }
  }

  isMobileDevice() {
    return (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    );
  }

  onDone($event) {
    if (this.counter < this.times) {
      this.state = this.state === "down" ? "up" : "down";
      this.counter++;
    }
  }

  goToTracking() {
    this.router.navigate(["/tracking"]);
  }

  addProduct() {
    this.showSpinner();
    let request: Request = new Request();

    request.productUrl = this.fabelioUrl;

    this.landingService.addProduct(request)
      .subscribe(result => {
        setTimeout(() => {
          this.hideSpinner()
          this.openSnackBar('Product has been added!', 'close');
          console.log(result);
        }, 500);
      }, err => {
        setTimeout(() => {
          console.log(err);
          this.hideSpinner()
          this.openSnackBar(err, 'close');
        }, 500);
      })
  }

  scroll(id) {
    const item = document.getElementById(id);

    item.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start"
    });

    var navbar: HTMLElement = document.querySelector("nav");

    setTimeout(() => {
      navbar.classList.add("nav-up");
    }, 1000);
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "bottom"
    });
  }
}
