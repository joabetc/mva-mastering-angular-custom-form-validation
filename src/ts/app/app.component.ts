import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

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
}

@Component({
    selector: "main",
    template: `
        <div>
            <label for="phone-number-input">Phone Number:</label>
            <input type="tel" id="phone-number-input" [formControl]="phoneNumberInput">
            <span *ngIf="phoneNumberInput.errors?.phoneNumber">
                Phone is not valid.
            </span>
            <span *ngIf="phoneNumberInput.errors?.required">
                Phone is not required.
            </span>
        </div>
    `,
})
export class AppComponent {

    public phoneNumberInput = new FormControl("", [phoneNumberValidator, Validators.required]);

}
