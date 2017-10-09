import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent, PhoneNumberValidatorDirective } from "./app.component";

import "../../scss/styles.scss";

@NgModule({
    imports: [ BrowserModule, FormsModule, ReactiveFormsModule ],
    declarations: [ AppComponent, PhoneNumberValidatorDirective ],
    bootstrap: [ AppComponent ],
})
export class AppModule { }
