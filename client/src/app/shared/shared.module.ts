import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { TranslatePipe } from "./pipe/translate-pipe";
import {
  MatNativeDateModule,
  MatExpansionModule,
  MatStepperModule,
  MatSnackBarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatDividerModule,
  MatSelectModule,
  MatButtonModule,
  MatButtonToggleModule
} from "@angular/material";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatStepperModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  declarations: [TranslatePipe],
  exports: [
    TranslatePipe,
    CommonModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatStepperModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
