import { NgModule } from '@angular/core';

import { ProductDetailsComponent } from './product-details.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { ProductDetailsRoutingModule } from './product-details.routing';
import { NgxGalleryModule } from 'ngx-gallery';

@NgModule({
    imports: [CommonModule, SharedModule, ProductDetailsRoutingModule, NgxGalleryModule],
    declarations: [ProductDetailsComponent],
})
export class ProductDetailsModule { }
