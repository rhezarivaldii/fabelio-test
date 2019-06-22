import { NgModule } from '@angular/core';
import { LandingComponent } from './landing.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { LandingRoutingComponent } from './landing.routing';
import { NavbarComponent } from 'app/shared/navbar/navbar.component';


@NgModule({
    imports: [CommonModule, SharedModule, LandingRoutingComponent],
    declarations: [LandingComponent]
})
export class LandingModule { }
