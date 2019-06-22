import { Injectable } from '@angular/core';
import { Product } from 'app/product/product-details/product.model';

@Injectable()
export class DataService {
    public appliedJob: String;
    public product: Product;
    
    constructor() { }
}