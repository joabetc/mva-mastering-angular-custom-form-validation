import { Component, Directive } from "@angular/core";
import { FormControl, Validators, NG_VALIDATORS, AbstractControl } from "@angular/forms";

import { Books } from "./services/books";

const validateBookId = (books: Books) => {

    return (c: AbstractControl) => {
        if (c.value == null || String(c.value).length === 0) {
            return Promise.resolve(null);
        }

        return new Promise((resolve, reject) => {
            books.getBook(Number(c.value)).subscribe(() => {
                resolve(null);
            }, () => {
                resolve({bookId: true});
            });
        })
    }
}

@Component({
    selector: "main",
    styles: [
        "input.ng-valid ~ span { display: none; }",
    ],
    template: `
        <div>
            <label for="book-id-input">Book Id:</label>
            <input type="tel" id="book-id-input" [formControl]="bookIdInput">
            <span>
                Book Id is not valid.
            </span>
        </div>
    `,
})
export class AppComponent {

    public bookIdInput = new FormControl("", null, validateBookId(this.books));

    constructor(private books: Books) { }
}
