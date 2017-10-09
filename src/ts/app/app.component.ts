import { Component, Directive } from "@angular/core";
import { FormControl, Validators, NG_VALIDATORS } from "@angular/forms";

const phoneNumberValidator = (control: FormControl) => {

    if (control.value == null || String(control.value).length === 0) {
        return null;
    }

    const re = new RegExp("^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$");

    if (!re.test(control.value)) {
        return {
            phoneNumber: true,
        };
    }

    return null;
};

const selectors = [
    "input[type=tel][ngModel]",
    "input[type=tel][formControl]",
    "input[type=tel][formControlName]",
    "[phone-number][ngModel]",
    "[phone-number][formControl]",
    "[phone-number][formControlName]",
];

@Directive({
    selector: selectors.join(","),
    providers: [
        { provide: NG_VALIDATORS, useValue: phoneNumberValidator, multi: true },
    ],
})
export class PhoneNumberValidatorDirective { }

@Component({
    selector: "main",
    styles: [
        "input.ng-valid ~ span { display: none; }",
    ],
    template: `
        <div>
            <label for="phone-number-input">Phone Number:</label>
            <input type="tel" id="phone-number-input" [(ngModel)]="phoneNumberInput">
            <span>
                Phone is not valid.
            </span>
        </div>
    `,
})
export class AppComponent {

    public phoneNumberInput = new FormControl("", [phoneNumberValidator, Validators.required]);

}
