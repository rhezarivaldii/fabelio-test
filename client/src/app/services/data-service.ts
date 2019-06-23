import { Injectable } from '@angular/core';
import { Product } from 'app/product/product-details/product.model';

@Injectable()
export class DataService {
    public product: Product;
    
    constructor() { }
}