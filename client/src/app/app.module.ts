import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatNativeDateModule, MatStepperModule, MatIconModule, MatCardModule, MatDividerModule, MatExpansionModule, MatInputModule, MatSelectModule, MatButtonModule, MatButtonToggleModule, MatSnackBarModule } from "@angular/material";
import { AppComponent } from './app.component';

import { NavbarComponent } from './shared/navbar/navbar.component';

import { UrlServices } from './services/url-services';
import { ProductService } from './product/product.service';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data-service';
import { TranslateService } from './services/translate-service';
import { TranslatePipe } from './shared/pipe/translate-pipe';
import { SharedModule } from './shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavbarService } from './shared/navbar/navbar.service';
import { APP_BASE_HREF } from '@angular/common';
import { LandingService } from './landing/landing.service';

export function setupTranslateFactory(
  service: TranslateService
): Function {
  return () => service.use('in');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    SharedModule.forRoot()
    
  ],
  providers: [
    UrlServices,
    ProductService,
    DataService,
    TranslateService,
    NavbarService,
    LandingService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      useValue: TranslatePipe,
      deps: [ TranslateService ],
      multi: true
    },
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
