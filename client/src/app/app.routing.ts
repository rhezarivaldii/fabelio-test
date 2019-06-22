import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes =[
    { path: '',                 loadChildren: './landing/landing.module#LandingModule' },
    { path: 'product',           loadChildren: './product/product.module#ProductModule' },
    { path: 'product-details/:id/:title',   loadChildren: './product/product-details/product-details.module#ProductDetailsModule' },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
