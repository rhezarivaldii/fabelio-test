import { Component, OnInit, ElementRef, Output } from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { TranslateService } from "app/services/translate-service";
import { NavbarService } from "./navbar.service";
import { Router, ActivatedRoute } from "@angular/router";
declare var $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  public activeLanguage: String = "ID";

  constructor(
    public location: Location,
    private element: ElementRef,
    private translateService: TranslateService,
    private navbarService: NavbarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName("html")[0];
    // console.log(html);
    // console.log(toggleButton, 'toggle');

    setTimeout(function() {
      toggleButton.classList.add("toggled");
    }, 500);
    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    // console.log(html);
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  isHome() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee === "/home") {
      return true;
    } else {
      return false;
    }
  }

  isLanding() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    // let titlee = this.route.component.name;

    // Change this with the context root later

    if (titlee === "/") {
      return true;
    } else {
      return false;
    }
  }

  isAbout() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee === "/about-us") {
      return false;
    } else {
      return false;
    }
  }
  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === "/documentation") {
      return true;
    } else {
      return false;
    }
  }

  setActiveLanguage(id) {
    this.translateService.use(id);

    if (id == "in") {
      this.activeLanguage = "ID";
    } else {
      this.activeLanguage = "EN";
    }

    this.sidebarClose();
  }

  emitNav(id) {
    // this.navbarService.setNavBarState(id);
    if (id != "home") {
      this.router.navigate(['/product']);
    }  else {
      this.router.navigate(['/']);
    }
  }
}
