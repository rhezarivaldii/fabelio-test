import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product.routing';


@NgModule({
    imports: [CommonModule, SharedModule, ProductRoutingModule],
    declarations: [ProductComponent],
})
export class ProductModule { }
