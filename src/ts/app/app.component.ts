import { Component, Directive, Inject, ViewChild } from "@angular/core";
import { NG_ASYNC_VALIDATORS, NgModelGroup, FormGroup } from "@angular/forms";

export interface AddressData {
    street: string;
    city: string;
    state: string;
    zipCode: string;
}

import { Geocoding } from "./services/geocoding";
import { STATES, States } from "./services/states";

@Component({
    selector: "main",
    styles: [ require("./app.component.scss") ],
    template: `
        <form>
            <fieldset ngModelGroup="addressGroup">
                <legend>Address <span>(Validated)</span></legend>
                <details class='errors'>
                    <summary>
                        Address From is Invalid
                        <small>(open for more details)</small>
                    </summary>
                    <ul>
                        <ng-template ngFor let-error [ngForOf]="getGroupErrors(addressGroup)">
                            <li *ngIf="error == 'streetInput:required'">Street is a required field.</li>
                            <li *ngIf="error == 'cityInput:required'">City is a required field.</li>
                            <li *ngIf="error == 'stateInput:required'">Select is a required field.</li>
                            <li *ngIf="error == 'zipCodeInput:required'">Zip Code is a required field.</li>
                            <li *ngIf="error == 'zipCodeInput:minlength'">Zip Code should be a minimum length of 5.</li>
                        </ng-template>
                        <li *ngIf="addressGroup.errors?.geocoding?.mismatch">Addess contains an error.</li>
                        <li *ngIf="addressGroup.errors?.geocoding?.noMatch">Addess does not exist.</li>
                        <li *ngIf="addressGroup.errors?.geocoding?.manyMatches">Multiple addresses matched.</li>
                        <li *ngIf="addressGroup.errors?.geocoding?.unknown">Addess validation failed.</li>
                    </ul>
                </details>
                <section>
                    <div>
                        <label id="street-input">Street:</label>
                        <input type="text" id="street-input" required autocomplete="off"
                            name="streetInput" [(ngModel)]="address.street">
                    </div>
                    <div>
                        <label id="city-input">City:</label>
                        <input type="text" id="city-input" required autocomplete="off"
                            name="cityInput" [(ngModel)]="address.city">
                    </div>
                    <div>
                        <label id="state-select">State:</label>
                        <select id="state-select" name="stateSelect" [(ngModel)]="address.state" required>
                            <option value="">Select One...</option>
                            <option *ngFor="let state of states" [value]="state.abbreviation">{{state.name}}</option>
                        </select>
                    </div>
                    <div>
                        <label id="zip-code-input">Zip Code:</label>
                        <input type="text" id="zip-code-input" required autocomplete="off"
                            name="zipCodeInput" [(ngModel)]="address.zipCode">
                    </div>
                </section>
            </fieldset>
        </form>
    `,
})
export class AppComponent { }
