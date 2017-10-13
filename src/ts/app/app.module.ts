import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { Books } from "./services/books";
import { Geocoding } from "./services/geocoding";
import { States, STATES, states } from "./services/states";

import { AppComponent } from "./app.component";

import "../../scss/styles.scss";

@NgModule({
    imports: [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ],
    providers: [ Geocoding, Books, { provide: STATES, useValue: states } ],
})
export class AppModule { }
